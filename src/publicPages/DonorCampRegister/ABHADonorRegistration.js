import React, { useState } from "react";
import { Input, Button, message, Select, Checkbox, Table } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { BaseUrl } from "../../utils/url";
import ConsentCheckboxes from "./ConsentCheckboxes";
import { checkboxContents } from "./CheckboxContent";
import AbhaRegistrationForm from "./ABHARegistrationForm";
import AbhaSearchViaMobile from "./AbhaSearchViaMobile";

const ABHADonorRegistration = ({ selectedCamp }) => {
  // State management
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
  const [flowType, setFlowType] = useState(null);
  const [selectedAbhaRecord, setSelectedAbhaRecord] = useState(null);
  const [searchViaMobTaxId, setsearchViaMobTaxId] = useState("");
  const [usingExistingAbha, setUsingExistingAbha] = useState(false);
  const [abhaNumber, setAbhaNumber] = useState("");
  const [abhaCreated, setAbhaCreated] = useState(false);
  const [token, setToken] = useState("");
  const [checkAll, setCheckAll] = useState(true);
  const [showValidationError, setShowValidationError] = useState(false);
  const [selectedVerificationMethod, setSelectedVerificationMethod] =
    useState(null);

  // Form data state
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

  // Checkboxes state
  const [checkboxes, setCheckboxes] = useState(
    checkboxContents.reduce((acc, item) => {
      acc[item.key] = true;
      return acc;
    }, {})
  );

  // Derived data
  const states = statesWithDistricts || [];
  const districts = selectedState
    ? states.find((state) => state.stateCode === selectedState)?.districts || []
    : [];

  // API Functions
  const sendOtpForNewAbha = async () => {
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
        return null;
      }

      if (response.data?.txnId) {
        return response.data.txnId;
      }
      throw new Error(response.data?.message || "Failed to send OTP");
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  const searchAbhaNumberViaMobile = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
        {
          mobile: mobileNumber,
          APIKey: "SearchAbhaNumberViaMobile",
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching ABHA:", error);
      throw error;
    }
  };

  const verifyOtpForNewAbha = async () => {
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
        return response.data?.tokens?.token || "";
      }
      throw new Error(response.data?.error || "OTP verification failed");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  };

  const sendOtpForExistingAbha = async (record) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
        {
          loginId: record.ABHA.index,
          txnId: record.txnId,
          APIKey: "AbhaSearchRequestOtp",
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );

      if (response.data?.txnId) {
        return response.data.txnId;
      }
      throw new Error(response.data?.message || "Failed to send OTP");
    } catch (error) {
      console.error("Error sending OTP for existing ABHA:", error);
      throw error;
    }
  };

  const verifyOtpForExistingAbha = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
        {
          otpValue: otp,
          txnId: searchViaMobTaxId,
          APIKey: "AbhaSearchVerifyOtp",
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );

      if (response.data?.token) {
        return response.data.token;
      }
      throw new Error(response.data?.message || "OTP verification failed");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  };

  const getAbhaProfile = async (token) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
        {
          "header#X-Token": token,
          APIKey: "LoginAbhaGetProfile",
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching ABHA profile:", error);
      throw error;
    }
  };

  const createAbhaNumber = async () => {
    try {
      const lgdStateCode = await fetchLgdStateCode(selectedState);
      const lgdDistrictCode = await fetchLgdDistrictCode(selectedDistrict);
      const combinedName = formData.firstName.replace(/\s+/g, "").toLowerCase();

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
        return response.data;
      }
      throw new Error(response.data?.error || "Failed to create ABHA Address");
    } catch (error) {
      console.error("Error creating ABHA Number:", error);
      throw error;
    }
  };

  const registerDonor = async () => {
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

    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/CampDonorRegistration/register`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Utility Functions
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

  const fetchStateCode = async (lgdStateCode) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/utility/getStateCode`,
        { lgdStateCode }
      );
      return response.data?.stateCode;
    } catch (error) {
      console.error("Error fetching state code:", error);
      return lgdStateCode;
    }
  };

  const fetchDistrictCode = async (lgdDistrictCode) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/utility/getDistrictCode`,
        { lgdDistrictCode }
      );
      return response.data?.districtCode;
    } catch (error) {
      console.error("Error fetching district code:", error);
      return lgdDistrictCode;
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

  // Handler Functions
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
    setCheckAll(Object.values(newCheckboxes).every(Boolean));
  };

  const toggleWidget = () => {
    setShowWidget(!showWidget);
  };

  const handleCreateAbha = () => {
    setShowCreateAbha(true);
  };

  const handleVerificationMethodChange = (value) => {
    setSelectedVerificationMethod(value);
    setVerificationMethod(value);
    setAbhaData(null); // Reset ABHA data when method changes
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
      const txnId = await sendOtpForNewAbha();
      if (txnId) {
        message.success("OTP sent successfully");
        setTxnId(txnId);
        setOtpSent(true);
        setAbhaData(null);
      }
    } catch (error) {
      message.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileSubmit = async () => {
    if (!validateCheckboxes()) {
      if (!showWidget) {
        setShowWidget(true);
      }
      return;
    }

    setFlowType("new");

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
      const responseData = await searchAbhaNumberViaMobile();

      if (Array.isArray(responseData) && responseData.length > 0) {
        const flattenedData = responseData.flatMap((item) =>
          item.ABHA.map((abha) => ({
            txnId: item.txnId,
            ABHA: abha,
          }))
        );

        setAbhaData(flattenedData);
        message.success(`${flattenedData.length} ABHA number(s) found`);
      } else if (
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
    if (flowType === "existing") {
      await handleVerifyExistingAbhaOtp();
    } else {
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
        const token = await verifyOtpForNewAbha();
        message.success("OTP verified successfully");
        setOtpVerified(true);
        setToken(token);
      } catch (error) {
        message.error(error.message || "OTP verification failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAgeChange = (e) => {
    const ageValue = e.target.value;
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - parseInt(ageValue);
    if (/^\d{0,2}$/.test(ageValue)) {
      setFormData({
        ...formData,
        age: ageValue,
        yearOfBirth: birthYear.toString(),
        monthOfBirth: "01",
        dayOfBirth: "01",
      });
    }
  };

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      firstName: e.target.value,
    });
  };

  const handleFormChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "pincode") {
      // Allow only digits and max 6 chars
      if (/^\d{0,6}$/.test(value)) {
        setFormData({ ...formData, [field]: value });
      }
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleHealthIdChange = (e) => {
    const value = e.target.value;
    let processedValue = value;

    if (!value.endsWith("@sbx") && !value.includes("@")) {
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

    setLoading(true);
    try {
      await createAbhaNumber();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "ABHA Address Created Successfully",
      });
      setAbhaCreated(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to create ABHA Address",
      });
      setAbhaCreated(false);
    } finally {
      setLoading(false);
    }
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

    setLoading(true);
    try {
      await registerDonor();
      Swal.fire({
        title: "Success!",
        text: "Registered Successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      message.error(error.response?.data || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleUseExistingAbha = async (record) => {
    setFlowType("existing");
    setSelectedAbhaRecord(record);
    setLoading(true);

    try {
      const txnId = await sendOtpForExistingAbha(record);
      message.success("OTP sent successfully");
      setsearchViaMobTaxId(txnId);
      setOtpSent(true);
      setAbhaData(null);
    } catch (error) {
      message.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyExistingAbhaOtp = async () => {
    if (!otp || otp.length !== 6) {
      message.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!searchViaMobTaxId) {
      message.error("Transaction ID not found. Please request OTP again.");
      return;
    }

    setLoading(true);
    try {
      const token = await verifyOtpForExistingAbha();
      message.success("OTP verified successfully");

      const profileData = await getAbhaProfile(token);
      if (profileData) {
        const stateCode = await fetchStateCode(profileData.stateCode);
        const districtCode = await fetchDistrictCode(profileData.districtCode);

        setFormData({
          ...formData,
          firstName: profileData.name || "",
          healthId: profileData.preferredAbhaAddress || "",
          address: profileData.address || "",
          pincode: profileData.pincode || "",
        });

        if (profileData.gender) {
          setSelectedGender(profileData.gender);
        }

        if (profileData.yearOfBirth) {
          const currentYear = new Date().getFullYear();
          const age = currentYear - parseInt(profileData.yearOfBirth);
          setFormData((prev) => ({
            ...prev,
            age: age.toString(),
            yearOfBirth: profileData.yearOfBirth,
            monthOfBirth: profileData.monthOfBirth || "01",
            dayOfBirth: profileData.dayOfBirth || "01",
          }));
        }

        if (profileData.ABHANumber) {
          setAbhaNumber(profileData.ABHANumber);
        }
        setSelectedState(stateCode);
        setSelectedDistrict(districtCode);
        setUsingExistingAbha(true);
        setOtpVerified(true);
      }
    } catch (error) {
      message.error(error.message || "Failed to verify OTP or fetch profile");
    } finally {
      setLoading(false);
    }
  };

  // Table columns
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
            handleUseExistingAbha(record);
          }}
        >
          Use This ABHA
        </Button>
      ),
    },
  ];

  // Render
  return (
    <>
      {otpVerified ? (
        <div>
          <AbhaRegistrationForm
            abhaData={abhaData}
            formData={formData}
            mobileNumber={mobileNumber}
            selectedGender={selectedGender}
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
            states={states}
            districts={districts}
            genders={genders}
            usingExistingAbha={usingExistingAbha}
            abhaNumber={abhaNumber}
            handleNameChange={handleNameChange}
            handleAgeChange={handleAgeChange}
            handleGenderChange={handleGenderChange}
            handleFormChange={handleFormChange}
            handleStateChange={handleStateChange}
            handleDistrictChange={handleDistrictChange}
            handleHealthIdChange={handleHealthIdChange}
            handleCreateAbhaNumber={handleCreateAbhaNumber}
            loading={loading}
          />

          <div className="d-flex align-items-center justify-content-end mt-3">
            <Button
              onClick={handleRegister}
              className="px-5 py-3"
              type="primary"
              loading={loading}
              disabled={!usingExistingAbha && !abhaCreated}
            >
              Register
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {abhaData ? (
            <div className="widget p-3 mb-3">
              {otpSent && flowType === "existing" ? (
                <div className="row align-items-end">
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
                  <div className="col-2">
                    <Button
                      onClick={handleVerifyOtp}
                      className="px-5 py-3"
                      type="primary"
                      loading={loading}
                    >
                      Verify OTP
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h4>Existing ABHA Numbers Found</h4>
                  <Table
                    columns={abhaColumns}
                    dataSource={abhaData}
                    rowKey={(record) =>
                      record.ABHA?.ABHANumber || Math.random()
                    }
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
                </>
              )}
            </div>
          ) : (
            <>
              {showCreateAbha && (
                <h3 className="abha-header">Create your ABHA through</h3>
              )}
              <div className="row pb-3">
                <div className={`col-${otpSent ? "12" : "6"}`}>
                  <div className="widget p-3">
                    {!showCreateAbha ? (
                      <div className="d-flex align-items-end gap-3">
                        <div className="form-inputs" style={{ width: "40%" }}>
                          <label className="form-label mb-1">Verify via</label>
                          <Select
                            className="w-100"
                            showSearch
                            allowClear
                            placeholder="Select option"
                            value={selectedVerificationMethod}
                            onChange={(value) => {
                              setSelectedVerificationMethod(value);
                              setVerificationMethod(value);
                              setAbhaData(null);
                            }}
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={[
                              { value: "mobile", label: "Mobile" },
                              { value: "aadhaar", label: "Aadhaar" },
                              {
                                value: "abhaSearchViaMobile",
                                label: "Search ABHA via Mobile",
                              },
                              { value: "abhaNumber", label: "ABHA Number" },
                              { value: "abhaAddress", label: "ABHA Address" },
                            ]}
                          />
                        </div>

                        {selectedVerificationMethod ===
                        "abhaSearchViaMobile" ? (
                          <div>
                            <AbhaSearchViaMobile
                              mobileNumber={mobileNumber}
                              setMobileNumber={setMobileNumber}
                              setFlowType={setFlowType}
                              setOtpSent={setOtpSent}
                              setLoading={setLoading}
                              selectedCamp={selectedCamp}
                              setAbhaData={setAbhaData}
                              setSelectedAbhaRecord={setSelectedAbhaRecord}
                              setsearchViaMobTaxId={setsearchViaMobTaxId}
                            />
                          </div>
                        ) : (
                          <>
                            <div style={{ width: "40%" }}>
                              <label className="form-label mb-1">
                                ABHA Number/ ABHA Address
                                <span
                                  className="mendate"
                                  style={{ color: "red" }}
                                >
                                  *
                                </span>
                              </label>
                              <Input
                                placeholder={
                                  selectedVerificationMethod === "abhaNumber"
                                    ? "Enter ABHA Number"
                                    : selectedVerificationMethod ===
                                      "abhaAddress"
                                    ? "Enter ABHA Address"
                                    : "Select verification method first"
                                }
                              />
                            </div>
                            <Button>Verify</Button>
                          </>
                        )}

                        <p className="mb-0">Or</p>
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
