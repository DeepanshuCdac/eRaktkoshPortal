import React, { useState } from "react";
import { Input, Button, message, Select, Checkbox, Table } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { BaseUrl } from "../../utils/url";
import ConsentCheckboxes from "./ConsentCheckboxes";
import { checkboxContents } from "./CheckboxContent";

const ABHADonorRegistration = ({ selectedCamp }) => {
  const { statesWithDistricts, genders } = useSelector((state) => state.data);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [showWidget, setShowWidget] = useState(false);
  const [showCreateAbha, setShowCreateAbha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [txnId, setTxnId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [abhaData, setAbhaData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    age: "",
    fatherName: "",
    email: "",
    address: "",
    pincode: "",
    healthId: "",
    dayOfBirth: "",
    monthOfBirth: "",
    yearOfBirth: "",
  });
  const [token, setToken] = useState("");
  const [checkboxes, setCheckboxes] = useState(
    checkboxContents.reduce((acc, item) => {
      acc[item.key] = true;
      return acc;
    }, {})
  );
  const [checkAll, setCheckAll] = useState(true);
  const [showValidationError, setShowValidationError] = useState(false);

  const validateCheckboxes = () => {
    const allChecked = Object.values(checkboxes).every(Boolean);
    if (!allChecked) {
      Swal.fire({
        title: "Consent Required",
        text: "Please view and accept the consent first!!",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      setShowValidationError(true);
      if (!showWidget) {
        setShowWidget(true);
      }
    }
    return allChecked;
  };

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
    const newCheckboxes = { ...checkboxes };
    for (const key in newCheckboxes) {
      newCheckboxes[key] = isChecked;
    }
    setCheckboxes(newCheckboxes);
  };

  const handleCheckboxChange = (key) => {
    const newCheckboxes = {
      ...checkboxes,
      [key]: !checkboxes[key],
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

  const handleCreateNewAbha = async () => {
    if (!validateCheckboxes()) {
      if (!showWidget) {
        setShowWidget(true);
      }
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
        {
          APIKey: "CreationMobileRequestOtp",
          patMobileNo: mobileNumber,
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );

      const errorMessage = response.data?.Error?.message;
      if (
        errorMessage?.includes("you have exceeded ABHA address creation limit")
      ) {
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      if (response.data?.txnId) {
        message.success("OTP sent successfully");
        setTxnId(response.data.txnId);
        setOtpSent(true);
        setAbhaData(null);
      } else {
        throw new Error(response.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      message.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileSubmit = async () => {
    if (!validateCheckboxes()) {
      // Show all checkboxes if they're not already visible
      if (!showWidget) {
        setShowWidget(true);
      }
      return;
    }

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
      const searchResponse = await axios.post(
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
        {
          mobile: mobileNumber,
          APIKey: "SearchAbhaNumberViaMobile",
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );

      const responseData = searchResponse.data;

      // If ABHA number(s) found
      if (Array.isArray(responseData) && responseData.length > 0) {
        const flattenedData = responseData.flatMap((item) =>
          item.ABHA.map((abha) => ({
            txnId: item.txnId,
            ABHA: abha,
          }))
        );

        setAbhaData(flattenedData);
        message.success(`${flattenedData.length} ABHA number(s) found`);
      }
      // If object format with error
      else if (
        responseData?.Error?.error?.code === "ABDM-1114" ||
        responseData?.HttpStatus === 404
      ) {
        await handleCreateNewAbha();
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.Error?.error?.code === "ABDM-1114") {
        await handleCreateNewAbha();
      } else {
        message.error(
          error.response?.data?.message ||
            "Failed to check for existing ABHA numbers"
        );
      }
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
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
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
        setToken(response.data?.tokens?.token || "");
      } else {
        throw new Error(response.data?.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      message.error(error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const abhaColumns = [
    {
      title: "ABHA Number",
      dataIndex: "ABHA",
      key: "ABHA",
      render: (abha) => abha?.ABHANumber || "N/A",
    },
    {
      title: "Name",
      dataIndex: "ABHA",
      key: "name",
      render: (abha) => abha?.name || "N/A",
    },
    {
      title: "Gender",
      dataIndex: "ABHA",
      key: "gender",
      render: (abha) => {
        const gender = abha?.gender;
        return gender
          ? genders.find((g) => g.genderCode === gender)?.genderName || gender
          : "N/A";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setOtpVerified(true);
          }}
        >
          Use This ABHA
        </Button>
      ),
    },
  ];

  const fetchLgdStateCode = async (stateCode) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/utility/getLgdStateCode`,
        { stateCode }
      );
      return response.data?.lgdStateCode;
    } catch (error) {
      console.error("Error fetching LGD state code:", error);
      return stateCode;
    }
  };

  const fetchLgdDistrictCode = async (districtCode) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/utility/getLgdDistrictCode`,
        { districtCode }
      );
      return response.data?.lgdDistrictCode;
    } catch (error) {
      console.error("Error fetching LGD district code:", error);
      return districtCode;
    }
  };

  const handleAgeChange = (e) => {
    const ageValue = e.target.value;
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - parseInt(ageValue);

    setFormData({
      ...formData,
      age: ageValue,
      yearOfBirth: birthYear.toString(),
      monthOfBirth: "01", // January
      dayOfBirth: "01", // 1st
    });
  };

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      firstName: e.target.value,
    });
  };

  const handleFormChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleHealthIdChange = (e) => {
    const value = e.target.value;
    let processedValue = value;

    // If the value doesn't end with @sbx and doesn't contain any @ symbol
    if (!value.endsWith("@sbx") && !value.includes("@")) {
      // Remove any existing @sbx if somehow present in the middle
      processedValue = value.replace("@sbx", "") + "@sbx";
    }

    setFormData({
      ...formData,
      healthId: processedValue,
    });
  };

  const handleCreateAbhaNumber = async () => {
    if (!token) {
      message.error("Authentication token not found. Please verify OTP again.");
      return;
    }

    if (!formData.healthId) {
      message.error("Please enter ABHA Address");
      return;
    }

    const combinedName = formData.firstName.replace(/\s+/g, "").toLowerCase();

    setLoading(true);
    try {
      const lgdStateCode = await fetchLgdStateCode(selectedState);
      const lgdDistrictCode = await fetchLgdDistrictCode(selectedDistrict);

      const response = await axios.post(
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
        {
          APIKey: "CreationMobileCreateAbha",
          firstName: formData.firstName,
          middleName: "",
          lastName: "",
          gender: selectedGender,
          dayOfBirth: formData.dayOfBirth || "01",
          monthOfBirth: formData.monthOfBirth || "01",
          yearOfBirth: formData.yearOfBirth,
          password: "",
          profilePhoto: "",
          wardCode: "",
          townCode: "",
          email: "",
          address: formData.address,
          stateCode: lgdStateCode,
          districtCode: lgdDistrictCode,
          pincode: formData.pincode,
          mobile: mobileNumber,
          restrictions: "",
          overridePatDtlExistCheck: "false",
          healthId: formData.healthId,
          villageCode: "",
          token: token,
          subdistrictCode: "",
          name: combinedName,
          txnId: txnId,
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );

      if (response.data?.message === "ABHA Address Created Successfully") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data?.message,
        });
      } else {
        throw new Error(
          response.data?.error || "Failed to create ABHA Address"
        );
      }
    } catch (error) {
      console.error("Error creating ABHA Number:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCampDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length !== 3) return "";
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const monthNumber = monthMap[month] || "01";
    return `${day}-${monthNumber}-${year}`;
  };

  const handleRegister = async () => {
    if (!validateCheckboxes()) {
      if (!showWidget) {
        setShowWidget(true);
      }
      return;
    }

    if (
      !formData.firstName ||
      !formData.age ||
      !selectedGender ||
      !mobileNumber ||
      !formData.fatherName ||
      !selectedState ||
      !selectedDistrict
    ) {
      message.error("Please fill all mandatory fields.");
      return;
    }

    const formattedCampDate = formatCampDate(selectedCamp?.campDate);

    const payload = {
      campId: selectedCamp?.campReqNo,
      mobileNo: mobileNumber,
      name: formData.firstName,
      dob: "",
      genderCode: selectedGender,
      bloodGroupCode: "",
      address: "",
      stateCode: selectedState,
      districtCode: selectedDistrict,
      healthId: null,
      healthIdNumber: null,
      password: "7c4a8d09ca3762af61e59520943dc26494f8941b",
      email: formData.email,
      city: formData.address,
      fatherName: formData.fatherName,
      age: formData.age,
      empId: null,
      pinCode: formData.pincode,
      campDate: formattedCampDate,
      campSource: null,
      isBloodBankRegister: 0,
      source: null,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/CampDonorRegistration/register`,
        payload
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Registered Successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        // handleEditMobile();
        // onSuccess();
      }
    } catch (error) {
      console.error("Registration error :", error);
      message.error(error.response?.data || "registration failed!");
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
                  <label className="form-label mb-1">
                    Name<span className="mendate">*</span>
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={formData.firstName}
                    onChange={handleNameChange}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label className="form-label mb-1">
                    Age<span className="mendate">*</span>
                  </label>
                  <Input
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleAgeChange}
                  />
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
                  <label className="form-label mb-1">
                    Father Name<span className="mendate">*</span>
                  </label>
                  <Input
                    placeholder="Enter your father's name"
                    value={formData.fatherName}
                    onChange={handleFormChange("fatherName")}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label className="form-label mb-1">
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
                  <label className="form-label mb-1">Email</label>
                  <Input
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleFormChange("email")}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3 form-inputs">
                  <label className="form-label mb-1">Address</label>
                  <Input
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={handleFormChange("address")}
                  />
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
                  <label className="form-label mb-1">Pincode</label>
                  <Input
                    placeholder="Enter Pincode"
                    value={formData.pincode}
                    onChange={handleFormChange("pincode")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="widget p-3 ">
            <div className="row">
              <div className="col-6 d-flex align-items-center gap-3">
                <p className="mb-0 abha_txt me-2">Enter ABHA Address</p>
                <Input
                  placeholder="Enter your ABHA address (e.g., deepanshu124)"
                  value={formData.healthId.replace("@sbx", "")}
                  onChange={handleHealthIdChange}
                  addonAfter="@sbx"
                />
                <Button
                  className="px-5 py-3 abha_btn"
                  type="primary"
                  loading={loading}
                  onClick={handleCreateAbhaNumber}
                  disabled={!formData.healthId}
                >
                  Create ABHA Address
                </Button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-3">
            <Button
              onClick={handleRegister}
              className="px-5 py-3"
              type="primary"
              loading={loading}
            >
              Register
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {abhaData ? (
            <div className="widget p-3 mb-3">
              <h4>Existing ABHA Numbers Found</h4>
              <Table
                columns={abhaColumns}
                dataSource={abhaData}
                rowKey={(record) => record.ABHA?.ABHANumber || Math.random()}
                pagination={false}
              />
              <div className="mt-3">
                <Button
                  type="default"
                  onClick={handleCreateNewAbha}
                  loading={loading}
                >
                  Create New ABHA
                </Button>
              </div>
            </div>
          ) : (
            <>
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
                            <span className="mendate" style={{ color: "red" }}>
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
                            <label className="form-label mb-1">
                              Generate via
                            </label>
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
                                  ? "Enter mobile"
                                  : verificationMethod === "Aadhaar"
                                  ? "Enter Aadhaar number"
                                  : "Select method first"
                              }
                              value={mobileNumber}
                              onChange={handleMobileNumberChange}
                              disabled={!verificationMethod}
                              maxLength={
                                verificationMethod === "mobile" ? 10 : 12
                              }
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
                  <span className="mendate" style={{ color: "#7f0210" }}>
                    *
                  </span>
                </Checkbox>
                <Button type="link" onClick={toggleWidget}>
                  {showWidget ? "Show Less" : "Show All"}
                </Button>
              </div>
              <ConsentCheckboxes
                checkboxes={checkboxes}
                onChange={handleCheckboxChange}
                showAll={showWidget}
                showValidationError={showValidationError}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ABHADonorRegistration;
