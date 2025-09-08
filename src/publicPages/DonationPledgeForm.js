import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
import { AutoComplete, Button, Checkbox, Radio, Select, Input } from "antd";
import Swal from "sweetalert2";

const text = {
  heading: "I hereby declare that",
  content:
    "“I hereby give my consent to share my details for the purpose of registering my pledge for voluntary blood donation. I understand that my information may be used by the Ministry of Health & Family Welfare / authorized organizations only for awareness, communication, and follow-up related to blood donation activities. I confirm that I am providing this information voluntarily and agree to be contacted for blood donation drives and awareness campaigns.”",
};

export default function DonationPledgeForm({
  continueCallBack,
  formData,
  setFormData,
}) {
  const dispatch = useDispatch();
  const { statesWithDistricts = [], genders = [] } = useSelector(
    (state) => state.data
  );

  const [agree, setAgree] = useState(false);

  useEffect(() => {
    dispatch(getApiData());
  }, [dispatch]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "state" ? { district: null } : {}),
    }));
  };

  const states = statesWithDistricts;
  const districts =
    formData.state &&
    states.find((s) => s.stateCode === formData.state)?.districts;

  // Validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidAge = (age) => /^\d{1,2}$/.test(age) && +age >= 18 && +age <= 65;
  const isValidPincode = (pincode) => /^\d{6}$/.test(pincode);

  const isFormValid =
    formData.name.trim() &&
    isValidAge(formData.age) &&
    formData.gender &&
    // isValidEmail(formData.email) &&
    formData.state &&
    formData.district &&
    isValidPincode(formData.pincode) &&
    formData.language &&
    agree;

  const handleContinue = () => {
    if (!isFormValid) {
      //   message.error("Please fill all required fields correctly.");
      Swal.fire({
        text: "Please fill all required fields correctly.",
        icon: "error",
      });
      return;
    }
    console.log("Form Submitted:", formData);
    // message.success("Form submitted successfully!");
    Swal.fire({ text: "Form submitted successfully!", icon: "success" });
    continueCallBack();
  };

  return (
    <>
      <div className="bg-border p-3">
        <h3 className="mb-2 header_details">Personal Details</h3>

        <div className="row">
          {/* Name */}
          <div className="col-4 mb-3">
            <div className="input-wrapper-field">
              <label className="form-label mb-0">
                Name<span className="mandatory">*</span>
              </label>
              <AutoComplete
                style={{ width: "100%" }}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
              />
            </div>
          </div>

          {/* Age */}
          <div className="col-4 mb-3">
            <div className="input-wrapper-field">
              <label className="form-label mb-0">
                Age<span className="mandatory">*</span>
              </label>
              <Input
                type="text"
                maxLength={2}
                style={{ width: "100%" }}
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) =>
                  handleChange("age", e.target.value.replace(/\D/g, ""))
                }
              />
            </div>
          </div>

          {/* Gender */}
          <div className="col-4 mb-3">
            <div className="input-wrapper-field">
              <label className="form-label mb-0">
                Gender<span className="mandatory">*</span>
              </label>
              <Select
                showSearch
                allowClear
                style={{ width: "100%" }}
                placeholder="Select gender"
                value={formData.gender}
                onChange={(value) => handleChange("gender", value)}
                options={genders.map((gender) => ({
                  value: gender.genderCode,
                  label: gender.genderName,
                }))}
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-4">
            <div className="input-wrapper-field">
              <label className="form-label mb-0">
                Email
              </label>
              <AutoComplete
                style={{ width: "100%" }}
                placeholder="Enter email address"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
              />
            </div>
          </div>

          {/* State */}
          <div className="col-4">
            <div className="input-wrapper-field">
              <label className="form-label mb-0">
                State<span className="mandatory">*</span>
              </label>
              <Select
                showSearch
                allowClear
                style={{ width: "100%" }}
                placeholder="Select state"
                value={formData.state}
                onChange={(value) => handleChange("state", value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={states.map((state) => ({
                  value: state.stateCode,
                  label: state.stateName,
                }))}
              />
            </div>
          </div>

          {/* District */}
          <div className="col-2">
            <div className="input-wrapper-field">
              <label className="form-label mb-0">
                District<span className="mandatory">*</span>
              </label>
              <Select
                showSearch
                allowClear
                style={{ width: "100%" }}
                placeholder="Select district"
                value={formData.district}
                onChange={(value) => handleChange("district", value)}
                options={(districts || []).map((district) => ({
                  value: district.districtCode,
                  label: district.districtName,
                }))}
              />
            </div>
          </div>

          {/* Pincode */}
          <div className="col-2">
            <div className="input-wrapper-field">
              <label className="form-label mb-0">
                Pincode<span className="mandatory">*</span>
              </label>
              <Input
                type="text"
                maxLength={6}
                style={{ width: "100%" }}
                placeholder="Enter 6-digit pincode"
                value={formData.pincode}
                onChange={(e) =>
                  handleChange("pincode", e.target.value.replace(/\D/g, ""))
                }
              />
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="py-4">
          <Checkbox
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          >
            <p className="heading_pledge mb-1">
              {text.heading}
              <span className="mandatory">*</span>
            </p>
          </Checkbox>
          <p className="content_pledge mb-0">{text.content}</p>
        </div>

        {/* Language */}
        <div>
          <p className="heading_pledge mb-2">
            Select your preferred language to fill the pledge
            <span className="mandatory">*</span>
          </p>
          <Radio.Group
            onChange={(e) => handleChange("language", e.target.value)}
            value={formData.language}
            options={[
              { value: "1", label: "English" },
              { value: "2", label: "Hindi" },
            ]}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="btns d-flex align-items-center justify-content-end gap-3 pt-4">
        <Button
          className="px-4"
          type="primary"
          onClick={handleContinue}
          disabled={!isFormValid}
        >
          Continue
        </Button>
        <Button className="px-4" type="secondary">
          Close
        </Button>
      </div>
    </>
  );
}
