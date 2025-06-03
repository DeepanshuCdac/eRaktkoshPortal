import React, { useState } from "react";
import { Input, Button, message, Select, Checkbox, Table } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const ABHADonorRegistration = ({ selectedCamp }) => {
  const { statesWithDistricts, genders } = useSelector((state) => state.data);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [showWidget, setShowWidget] = useState(false);
  const [showCreateAbha, setShowCreateAbha] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [txnId, setTxnId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [abhaData, setAbhaData] = useState(null)
  const [checkboxes, setCheckboxes] = useState({
    consent1: false,
    consent2: false,
    consent3: false,
    consent4: false,
    consent5: false,
    consent6: false,
    consent7: false,
  });

  // Prepare states and districts data
  const states = statesWithDistricts || [];
  const districts = selectedState
    ? states.find((state) => state.stateCode === selectedState)?.districts || []
    : [];

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    setCheckboxes({
      consent1: isChecked,
      consent2: isChecked,
      consent3: isChecked,
      consent4: isChecked,
      consent5: isChecked,
      consent6: isChecked,
      consent7: isChecked,
    });
  };

  const handleCheckboxChange = (key) => (e) => {
    const newCheckboxes = {
      ...checkboxes,
      [key]: e.target.checked,
    };
    setCheckboxes(newCheckboxes);

    const allChecked = Object.values(newCheckboxes).every(Boolean);
    setCheckAll(allChecked);
  };

  const toggleWidget = () => {
    setShowWidget(!showWidget);
  };

  const handleCreateAbha = () => {
    setShowCreateAbha(true);
  };

  const handleVerificationMethodChange = (value) => {
    setVerificationMethod(value);
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
    }
  };

  const handleMobileSubmit = async () => {
    if (verificationMethod !== "mobile") {
      message.error("Please select mobile verification method");
      return;
    }

    if (!mobileNumber || mobileNumber.length !== 10) {
      message.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.226.25.103:8080/eraktkosh/abha/commonABHACall",
        {
          APIKey: "CreationMobileRequestOtp",
          patMobileNo: mobileNumber,
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );

      if (response.data?.txnId && response.data?.message) {
        message.success(response.data.message);
        setTxnId(response.data.txnId);
        setOtpSent(true);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      message.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      message.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!txnId) {
      message.error("Transaction ID not found. Please request OTP again.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.226.25.103:8080/eraktkosh/abha/commonABHACall",
        {
          APIKey: "CreationMobileVerifyOtp",
          otp: otp,
          txnId: txnId,
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );

      if (response.data?.message === "OTP Verified Successfully") {
        message.success("OTP verified successfully");
        setOtpVerified(true);
        console.log("Verification successful:", response.data);
      } else {
        message.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {otpVerified ? (
        <div>
          <h3 className="mb-1 camp_header">
            Create ABHA/Camp Pre Registration
          </h3>
          <div className="widget p-3 mb-3">
            <div className="row">
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Name<span className="mendate">*</span>
                  </label>
                  <Input placeholder="Enter your name" />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Age<span className="mendate">*</span>
                  </label>
                  <Input placeholder="Enter your age" />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label className="form-label mb-1">
                    Gender<span className="mendate">*</span>
                  </label>
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select Gender"
                    value={selectedGender}
                    onChange={handleGenderChange}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={genders.map((gender) => ({
                      value: gender.genderCode,
                      label: gender.genderName,
                    }))}
                    className="w-100"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Father Name<span className="mendate">*</span>
                  </label>
                  <Input placeholder="Enter your father's name" />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Mobile<span className="mendate">*</span>
                  </label>
                  <Input
                    placeholder="Enter your mobile"
                    value={mobileNumber}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Email
                  </label>
                  <Input placeholder="Enter your email" />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Address
                  </label>
                  <Input placeholder="Enter Address" />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label className="form-label mb-1">
                    State<span className="mendate">*</span>
                  </label>
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select State"
                    value={selectedState}
                    onChange={handleStateChange}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={states.map((state) => ({
                      value: state.stateCode,
                      label: state.stateName,
                    }))}
                    className="w-100"
                  />
                </div>
              </div>
              <div className="col-4 d-flex" style={{ gap: "18px" }}>
                <div className="mb-3 form-inputs" style={{ width: "48%" }}>
                  <label className="form-label mb-1">
                    District<span className="mendate">*</span>
                  </label>
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select District"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!selectedState}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={districts.map((district) => ({
                      value: district.districtCode,
                      label: district.districtName,
                    }))}
                    className="w-100"
                  />
                </div>
                <div className="mb-3 form-inputs" style={{ width: "48%" }}>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Pincode
                  </label>
                  <Input placeholder="Enter Pincode" />
                </div>
              </div>
            </div>
          </div>
          <div className="widget p-3 ">
            <div className="row">
              <div className="col-6 d-flex align-items-center">
                <p className="mb-0 abha_txt me-2">Enter ABHA Address</p>
                <Input placeholder="Enter your name" />
                <Button
                  className="px-5 py-3 abha_btn"
                  type="primary"
                  loading={loading}
                >
                  Create ABHA Number
                </Button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-3">
            <Button className="px-5 py-3" type="primary" loading={loading}>
              Register
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {showCreateAbha && (
            <h3 className="abha-header">Create your ABHA through</h3>
          )}
          <div className="row pb-3">
            <div className={`col-${otpSent ? "12" : "5"}`}>
              <div className="widget p-3">
                {!showCreateAbha ? (
                  <div className="d-flex align-items-end">
                    <div className="me-2">
                      <label className="form-label mb-1">
                        ABHA Number/ ABHA Address
                        <span style={{ color: "red" }} className="mendate">
                          *
                        </span>
                      </label>
                      <Input placeholder="Abc@adbm" />
                    </div>
                    <Button>Verify</Button>
                    <p className="mb-0 mx-3">Or</p>
                    <Button onClick={handleCreateAbha}>Create ABHA</Button>
                  </div>
                ) : (
                  <div className="row align-items-end">
                    <div className={`col-${otpSent ? "2" : "4"}`}>
                      <div className="form-inputs">
                        <label className="form-label mb-1">Generate via</label>
                        <Select
                          className="w-100"
                          showSearch
                          allowClear
                          placeholder="Select option"
                          value={verificationMethod}
                          onChange={handleVerificationMethodChange}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            { value: "mobile", label: "Mobile" },
                            { value: "Aadhaar", label: "Aadhaar" },
                          ]}
                        />
                      </div>
                    </div>
                    <div className={`col-${otpSent ? "2" : "4"}`}>
                      <div className="form-inputs">
                        <Input
                          placeholder={
                            verificationMethod === "mobile"
                              ? ""
                              : verificationMethod === "Aadhaar"
                              ? "Enter Aadhaar number"
                              : "Select method first"
                          }
                          value={mobileNumber}
                          onChange={handleMobileNumberChange}
                          disabled={verificationMethod !== "mobile"}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    {otpSent && (
                      <div className="col-3">
                        <div className="form-inputs">
                          <Input
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            maxLength={6}
                          />
                        </div>
                      </div>
                    )}
                    <div className={`col-${otpSent ? "2" : "4"}`}>
                      {!otpSent ? (
                        <Button
                          onClick={handleMobileSubmit}
                          className="px-5 py-3"
                          type="primary"
                          loading={loading}
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button
                          onClick={handleVerifyOtp}
                          className="px-5 py-3"
                          type="primary"
                          loading={loading}
                        >
                          Validate
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="checkbox_modal">
            <Checkbox onChange={handleCheckAllChange} checked={checkAll}>
              I hereby declare that{" "}
              <span style={{ color: "#7f0210" }} className="mendate">
                *
              </span>
            </Checkbox>
            <Button type="link" onClick={toggleWidget}>
              {showWidget ? "Show Less" : "Show All"}
            </Button>
          </div>
          {showWidget && (
            <div className="widget_ABHA p-3">
              <Checkbox
                checked={checkboxes.consent1}
                onChange={handleCheckboxChange("consent1")}
              >
                I am voluntarily sharing my Aadhaar Number / Virtual ID issued
                by the Unique Identification Authority of India (\"UIDAI\"), and
                my demographic information for the purpose of creating an
                Ayushman Bharat Health Account number (\"ABHA number\") and
                Ayushman Bharat Health Account address (\"ABHA Address\"). I
                authorize NHA to use my Aadhaar number / Virtual ID for
                performing Aadhaar-based authentication with UIDAI as per the
                provisions of the Aadhaar (Targeted Delivery of Financial and
                other Subsidies, Benefits and Services) Act, 2016 for the
                aforesaid purpose. I understand that UIDAI will share my e-KYC
                details, or response of \"Yes\" with NHA upon successful
                authentication.
              </Checkbox>

              <Checkbox
                checked={checkboxes.consent2}
                onChange={handleCheckboxChange("consent2")}
              >
                I intend to create Ayushman Bharat Health Account Number (\"ABHA
                number\") and Ayushman Bharat Health Account address (\"ABHA
                Address\") using a document other than Aadhaar. (Click here to
                proceed further)
              </Checkbox>

              <Checkbox
                checked={checkboxes.consent3}
                onChange={handleCheckboxChange("consent3")}
              >
                I consent to the usage of my ABHA address and ABHA number for
                linking my legacy (past) government health records and those
                which will be generated during this encounter.
              </Checkbox>

              <Checkbox
                checked={checkboxes.consent4}
                onChange={handleCheckboxChange("consent4")}
              >
                I authorize the sharing of all my health records with healthcare
                provider(s) for the purpose of providing healthcare services to
                me during this encounter.
              </Checkbox>

              <Checkbox
                checked={checkboxes.consent5}
                onChange={handleCheckboxChange("consent5")}
              >
                I consent to the anonymization and subsequent use of my
                government health records for public health purposes.
              </Checkbox>

              <Checkbox
                checked={checkboxes.consent6}
                onChange={handleCheckboxChange("consent6")}
              >
                I, the user, confirm that I have duly informed and explained the
                beneficiary of the contents of consent for the aforementioned
                purposes.
              </Checkbox>

              <Checkbox
                checked={checkboxes.consent7}
                onChange={handleCheckboxChange("consent7")}
              >
                I, the beneficiary, have been explained about the consent as
                stated above and provide my consent for the aforementioned
                purposes.
              </Checkbox>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ABHADonorRegistration;
