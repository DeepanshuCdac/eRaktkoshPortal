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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getApiData());
  }, [dispatch]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "state" ? { district: null } : {}),
    }));
    setErrors((prev) => ({ ...prev, [key]: "" })); // clear error on change
  };

  const states = statesWithDistricts;
  const districts =
    formData.state &&
    states.find((s) => s.stateCode === formData.state)?.districts;

  // Validation
  const isValidEmail = (email) =>
    !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()); // optional
  const isValidAge = (age) => /^\d{1,2}$/.test(age) && +age >= 18 && +age <= 65;
  const isValidPincode = (pincode) => /^\d{6}$/.test(pincode);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = "Please enter name.";
    if (!formData.age || !isValidAge(formData.age))
      newErrors.age = "Please enter valid age.";
    if (!formData.gender) newErrors.gender = "Please enter Gender.";
    if (formData.email && !isValidEmail(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.district) newErrors.district = "District is required.";
    if (!formData.pincode || !isValidPincode(formData.pincode))
      newErrors.pincode = "Valid 6-digit pincode is required.";
    if (!formData.language) newErrors.language = "Please select a language.";
    if (!agree) newErrors.agree = "You must agree to the declaration.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateForm()) return;
    console.log("Form Submitted:", formData);
    continueCallBack();
  };

  return (
    <>
      <div className="bg-border p-3">
        <h3 className="mb-2 header_details">Personal Details</h3>

        <div className="row">
          {/* Name */}
          <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
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
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>
          </div>

          {/* Age */}
          <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
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
              {errors.age && (
                <small className="text-danger">{errors.age}</small>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
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
              {errors.gender && (
                <small className="text-danger">{errors.gender}</small>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
            <div className="input-wrapper-field">
              <label className="form-label mb-0">Email</label>
              <AutoComplete
                style={{ width: "100%" }}
                placeholder="Enter email address"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>
          </div>

          {/* State */}
          <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
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
                options={states.map((state) => ({
                  value: state.stateCode,
                  label: state.stateName,
                }))}
              />
              {errors.state && (
                <small className="text-danger">{errors.state}</small>
              )}
            </div>
          </div>

          {/* District */}
          <div className="col-xl-2 col-lg-4 col-md-6 mb-3">
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
              {errors.district && (
                <small className="text-danger">{errors.district}</small>
              )}
            </div>
          </div>

          {/* Pincode */}
          <div className="col-xl-2 col-lg-4 col-md-6 mb-3">
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
              {errors.pincode && (
                <small className="text-danger">{errors.pincode}</small>
              )}
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="pt-2 pb-4">
          <Checkbox
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked);
              setErrors((prev) => ({ ...prev, agree: "" }));
            }}
          >
            <p className="heading_pledge mb-1">
              {text.heading}
              <span className="mandatory">*</span>
            </p>
          </Checkbox>
          <p className="content_pledge mb-0">{text.content}</p>
          {errors.agree && (
            <small className="text-danger">{errors.agree}</small>
          )}
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
          {errors.language && (
            <small className="text-danger">{errors.language}</small>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="btns d-flex align-items-center justify-content-end gap-3 pt-4">
        <Button className="px-4" type="primary" onClick={handleContinue}>
          Continue
        </Button>
        <Button className="px-4" type="secondary">
          Close
        </Button>
      </div>
    </>
  );
}
