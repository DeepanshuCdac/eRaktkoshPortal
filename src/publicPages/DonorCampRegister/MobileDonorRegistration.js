// MobileDonorRegistration.js
import React, { useState, useEffect } from "react";
import { Input, Button, Select } from "antd";
import axios from "axios";
import { BaseUrl } from "../../utils/url";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const MobileDonorRegistration = ({ selectedCamp, onSuccess }) => {
  const { statesWithDistricts, genders } = useSelector((state) => state.data);

  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [captchaImage, setCaptchaImage] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    fatherName: "",
    email: "",
    address: "",
    pincode: "",
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

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNo(value);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleGenerateOTP = async () => {
    if (!mobileNo || mobileNo.length !== 10) {
      Swal.fire({
        text: "Please enter a valid 10-digit mobile number.",
        icon: "question",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post(`${BaseUrl}/eraktkosh/otp/generate`, {
        mobileNo: mobileNo,
      });

      if (response.data) {
        Swal.fire({
          text: "OTP has been generated Successfully!",
          icon: "success",
        });
        setOtpSent(true);
        setTimer(300);
        setCaptchaImage(response.data.captchaImage);
        setOtp("");
        setUserCaptchaInput("");
        setIsValidated(false);

        //  Check if OTP field is present
        if (response.data.otp) {
          try {
            await axios.post(`${BaseUrl}/eraktkosh/otp/otp_log/insert`, {
              mobileNo: mobileNo,
            });
            console.log(response.data);
          } catch (logError) {
            console.error("Error inserting OTP log:", logError);
          }
        }
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      Swal.fire({
        text: error.response?.data || "Failed to generate OTP",
        icon: "error",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefreshCaptcha = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/otp/refresh-captcha`,
        {
          mobileNo: mobileNo,
        }
      );

      if (response.status === 200) {
        setCaptchaImage(response.data);
        setUserCaptchaInput("");
        Swal.fire({
          text: "CAPTCHA refreshed successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Refresh CAPTCHA error:", error);
      Swal.fire({
        text: error.response?.data || "Failed to REFRESH CAPTCHA!",
        icon: "error",
      });
    }
  };

  const handleValidateOTP = async () => {
    if (!otp || !userCaptchaInput) {
      Swal.fire({
        text: "Please enter both OTP and CAPTCHA",
        icon: "question",
      });
      return;
    }

    setIsValidating(true);
    try {
      const response = await axios.post(`${BaseUrl}/eraktkosh/otp/validate`, {
        mobileNo: mobileNo,
        otp: otp,
        captcha: userCaptchaInput,
      });

      if (response.data === "OTP validated successfully") {
        Swal.fire({
          text: response.data,
          icon: "success",
        });
        setIsValidated(true);

        // ✅ Now fetch donor details after OTP validation
        try {
          const donorResponse = await axios.get(
            `${BaseUrl}/eraktkosh/get/details/${mobileNo}`
          );

          if (
            !donorResponse.data ||
            (Array.isArray(donorResponse.data) &&
              donorResponse.data.length === 0)
          ) {
            // message.info("New Donor — please fill in your details");
            // Swal.fire({
            //     text: "New Donor — please fill in your details",
            //     icon: "error",
            //   })
            // Reset form
            setFormData({
              name: "",
              age: "",
              // genderCode: "",
              fatherName: "",
              email: "",
              address: "",
              // stateCode: "",
              // districtCode: "",
              pincode: "",
            });
            setSelectedGender(null);
            setSelectedState(null);
            setSelectedDistrict(null);
          } else {
            // ✅ Existing donor, prefill form fields
            const donor = Array.isArray(donorResponse.data)
              ? donorResponse.data[0]
              : donorResponse.data;

            // message.success("Existing donor details loaded successfully");
            // Swal.fire({
            //     text: "Existing donor details loaded successfully",
            //     icon: "error",
            //   })

            setFormData({
              ...formData,
              name: donor.name || donor.username || "",
              age: donor.age || "",
              // genderCode: donor.genderCode || donor.gendercode || "",
              fatherName: donor.fatherName || donor.fathername || "",
              email: donor.email || "",
              address: donor.address || "",
              pincode: donor.pinCode || donor.pincode || "",
            });

            // setSelectedGender(
            //   donor.genderCode || donor.gendercode || null
            // );
            // setSelectedState(
            //   donor.stateCode || donor.statecode || null
            // );
            // setSelectedDistrict(
            //   donor.districtCode || donor.districtcode || null
            // );
          }
        } catch (fetchError) {
          console.error("Error fetching donor details:", fetchError);
          Swal.fire({
            text: "Failed to fetch donor details",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Validation error:", error);
      Swal.fire({
        text: error.response?.data || "Validation failed",
        icon: "error",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) {
      Swal.fire({
        text: `Please wait ${formatTime(timer)} before resending`,
        icon: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(`${BaseUrl}/eraktkosh/otp/resend`, {
        mobileNo: mobileNo,
      });

      if (response.status === 200) {
        Swal.fire({
          text: "OTP resent Successfully!",
          icon: "success",
        });
        setTimer(50);
        setOtp("");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      Swal.fire({
        text: error.response?.data || "Failed to resend OTP",
        icon: "error",
      });
    }
  };

  const handleEditMobile = () => {
    setIsValidated(false);
    setOtpSent(false);
    setOtp("");
    setUserCaptchaInput("");
    setCaptchaImage("");
    setMobileNo("");
    setFormData({
      name: "",
      age: "",
      fatherName: "",
      email: "",
      address: "",
      pincode: "",
    });
    setSelectedGender(null);
    setSelectedState(null);
    setSelectedDistrict(null);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
    if (
      !formData.name ||
      !formData.age ||
      !selectedGender ||
      !mobileNo ||
      !formData.fatherName ||
      !selectedState ||
      !selectedDistrict
    ) {
      Swal.fire({
        text: "Please fill all mandatory fields.",
        icon: "warning",
      });
      return;
    }

    const formattedCampDate = formatCampDate(selectedCamp?.campDate);

    const payload = {
      campId: selectedCamp?.campReqNo,
      mobileNo: mobileNo,
      name: formData.name,
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
        handleEditMobile();
        onSuccess();
      }
    } catch (error) {
      console.error("Registration error :", error);
      Swal.fire({
        text: "Registration failed!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row pb-3">
        <div
          className={`${
            isValidated
              ? "col-12"
              : "col-xl-4 col-lg-6 col-md-6 col-sm-8 col-12 mb-2 mb-xl-0"
          }`}
        >
          <div className="widget p-3">
            <div className="d-flex align-items-end">
              <div className="me-2">
                <label className="form-label mb-1">Enter Mobile No.</label>
                <Input
                  maxLength={10}
                  value={mobileNo}
                  onChange={handleMobileChange}
                  placeholder="Enter Mobile No."
                  disabled={isValidated}
                />
              </div>
              {!isValidated ? (
                <Button
                  onClick={handleGenerateOTP}
                  loading={isGenerating}
                  disabled={!mobileNo || mobileNo.length !== 10}
                >
                  Generate OTP
                </Button>
              ) : (
                <Button onClick={handleEditMobile}>Edit</Button>
              )}
            </div>
            {otpSent && !isValidated && (
              <p className="mb-0 otp_generated mt-1">
                OTP has been sent to your Mobile
              </p>
            )}
            {isValidated && (
              <p className="mb-0 otp_generated mt-1" style={{ color: "green" }}>
                Mobile number verified successfully
              </p>
            )}
          </div>
        </div>

        {otpSent && !isValidated && (
          <div className="col-xl-8 col-12">
            <div className="p-3 widget h-100">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                  <Input
                    placeholder="Enter OTP"
                    value={otp}
                    maxLength={6}
                    onChange={handleOtpChange}
                    style={{
                      marginRight: "10px",
                      letterSpacing: "0.5rem",
                    }}
                  />

                  {otpSent && timer > 0 && (
                    <p className="mb-0 otpExpire mt-1">
                      OTP expire's in{" "}
                      <span className="timer">{formatTime(timer)}</span>
                    </p>
                  )}

                  {otpSent && (
                    <Button
                      className="small_btn px-1 mb-3 mb-xl-0 mb-lg-0 mb-md-0 mt-2"
                      onClick={handleResendOTP}
                      disabled={timer > 0}
                      style={{ height: "20px" }}
                    >
                      Resend OTP
                    </Button>
                  )}
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-0">
                  {captchaImage && (
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{
                        border: "1px solid #e5e5e5",
                        borderRadius: "5px",
                      }}
                    >
                      <img
                        src={captchaImage}
                        alt="CAPTCHA"
                        style={{ height: "30px" }}
                      />
                      <Button
                        type="text"
                        onClick={handleRefreshCaptcha}
                        icon={
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/refresh.png`}
                            alt="Refresh"
                            style={{ height: "16px" }}
                          />
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-0">
                  <Input
                    placeholder="Enter CAPTCHA"
                    value={userCaptchaInput}
                    onChange={(e) => setUserCaptchaInput(e.target.value)}
                    style={{
                      marginRight: "10px",
                      letterSpacing: "0.5rem",
                    }}
                  />
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-0">
                  <Button
                    className="w-100"
                    type="primary"
                    onClick={handleValidateOTP}
                    loading={isValidating}
                  >
                    Validate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isValidated && (
        <div>
          <h3 className="mb-1 camp_header">Camp Pre Registration</h3>
          <div className="widget p-3">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Name<span className="mendate">*</span>
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Age<span className="mendate">*</span>
                  </label>
                  <Input
                    placeholder="Enter your age"
                    value={formData.age}
                    maxLength={2}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,2}$/.test(value)) {
                        setFormData({ ...formData, age: value });
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
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
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Father Name<span className="mendate">*</span>
                  </label>
                  <Input
                    placeholder="Enter your father's name"
                    value={formData.fatherName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fatherName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Mobile<span className="mendate">*</span>
                  </label>
                  <Input
                    placeholder="Enter your mobile"
                    value={mobileNo}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Email
                  </label>
                  <Input
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    onBlur={() => {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (formData.email && !emailRegex.test(formData.email)) {
                        Swal.fire({
                          text: "Invalid email address",
                          icon: "error",
                        });
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="mb-3 form-inputs">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Address
                  </label>
                  <Input
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
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
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 d-flex" style={{ gap: "18px" }}>
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
                  <Input
                    placeholder="Enter Pincode"
                    value={formData.pincode}
                    maxLength={6}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,6}$/.test(value)) {
                        setFormData({
                          ...formData,
                          pincode: value,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end my-3">
            <Button
              className="px-5 py-3"
              type="primary"
              onClick={handleRegister}
              loading={loading}
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileDonorRegistration;
