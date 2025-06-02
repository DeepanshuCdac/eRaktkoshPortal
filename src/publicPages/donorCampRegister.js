import React, { useState, useEffect } from "react";
import "../scss/donorCampRegister.scss";
import { Input, Radio, Button, message, Select } from "antd";
import axios from "axios";
import { BaseUrl } from "../utils/url";
import { useCampContext } from "../context/CampContext";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
import Swal from "sweetalert2";

export default function DonorCampRegister() {
  const dispatch = useDispatch();
  const { selectedCamp } = useCampContext();
  const [value, setValue] = useState(1);
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
  const { statesWithDistricts, genders } = useSelector((state) => state.data);
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

  useEffect(() => {
    dispatch(getApiData());
  }, [dispatch]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNo(value);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleGenerateOTP = async () => {
    if (!mobileNo || mobileNo.length !== 10) {
      message.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post(`${BaseUrl}/eraktkosh/otp/generate`, {
        mobileNo: mobileNo,
      });

      if (response.data) {
        message.success("OTP and CAPTCHA generated successfully");
        console.log(response.data?.otp, "otp for validating donor.");
        setOtpSent(true);
        setTimer(300);
        setCaptchaImage(response.data.captchaImage);
        setOtp("");
        setUserCaptchaInput("");
        setIsValidated(false);
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      message.error(error.response?.data || "Failed to generate OTP");
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
        message.success("CAPTCHA refreshed");
      }
    } catch (error) {
      console.error("Refresh CAPTCHA error:", error);
      message.error(error.response?.data || "Failed to refresh CAPTCHA");
    }
  };

  const handleValidateOTP = async () => {
    if (!otp || !userCaptchaInput) {
      message.error("Please enter both OTP and CAPTCHA");
      return;
    }

    setIsValidating(true);
    try {
      const response = await axios.post(`${BaseUrl}/eraktkosh/otp/validate`, {
        mobileNo: mobileNo,
        otp: otp,
        captcha: userCaptchaInput,
      });

      if (response.status === 200) {
        message.success("OTP and CAPTCHA validated successfully");

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

        // calling another api..
        try {
          const userDataResponse = await axios.get(
            `${BaseUrl}/eraktkosh/get/${mobileNo}`
          );
          if (userDataResponse.data && userDataResponse.data.length > 0) {
            const userData = userDataResponse.data[0];

            setFormData({
              name: userData.username || "",
              age: userData.age || "",
              fatherName: userData.fathername || "",
              email: userData.email || "",
              address: userData.address || "",
              pincode: userData.pincode || "",
            });

            if (userData.gendercode) {
              const foundGender = genders.find(
                (g) => g.genderCode === userData.gendercode
              );
              if (foundGender) {
                setSelectedGender(foundGender.genderCode);
              }
            }
            if (userData.statecode) {
              const foundState = states.find(
                (state) => state.stateCode === userData.statecode.toString()
              );
              if (foundState) {
                setSelectedState(foundState.stateCode);
              }
            }
            if (userData.districtcode && userData.statecode) {
              const foundState = states.find(
                (state) => state.stateCode === userData.statecode.toString()
              );
              if (foundState) {
                const foundDistrict = foundState.districts.find(
                  (district) =>
                    district.districtCode === userData.districtcode.toString()
                );
                if (foundDistrict) {
                  setSelectedDistrict(foundDistrict.districtCode);
                }
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setIsValidated(true);
      }
    } catch (error) {
      console.error("Validation error:", error);
      message.error(error.response?.data || "Validation failed");
    } finally {
      setIsValidating(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) {
      message.warning(`Please wait ${formatTime(timer)} before resending`);
      return;
    }

    try {
      const response = await axios.post(`${BaseUrl}/eraktkosh/otp/resend`, {
        mobileNo: mobileNo,
      });

      if (response.status === 200) {
        message.success("OTP resent successfully");
        setTimer(50);
        setOtp("");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      message.error(error.response?.data || "Failed to resend OTP");
    }
  };

  const handleEditMobile = () => {
    setIsValidated(false);
    setOtpSent(false);
    setOtp("");
    setUserCaptchaInput("");
    setCaptchaImage("");
    setMobileNo("");

    // Reset all form fields
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

  const states = statesWithDistricts || [];
  const districts = selectedState
    ? states.find((state) => state.stateCode === selectedState)?.districts || []
    : [];

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (value) => [setSelectedDistrict(value)];

  const handleGenderChange = (value) => [setSelectedGender(value)];

  const formatCampDate = (dateString) => {
    if (!dateString) return "";

    // Split the date string into parts
    const parts = dateString.split("-");
    if (parts.length !== 3) return "";

    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    // Map month abbreviations to numbers
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
      (!formData.name || !formData.age || !formData.gender || !mobileNo,
      !formData.fatherName || !selectedState || !selectedDistrict)
    ) {
      message.error("Please fill all mandatory fields.");
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
        // message.success("Registration Successful!")
        Swal.fire({
          title: "Success!",
          text: "Registered Successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        handleEditMobile();
        setValue(2);
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
      <div className="page_wrapper gradient_style">
        <div className="container">
          <h2 className="header-page mb-2 pt-3">
            Pre Registration for Blood Donation Camp
          </h2>
          <div className="d-flex flex-wrap mt-3 container-style">
            <div className="widget px-3 pb-0 w-100">
              <div className="row align-items-center">
                <div className="col-3">
                  <div className="d-flex align-items-start">
                    <img src="assets/images/campName.svg" alt="" />
                    <div className="ms-1">
                      <p className="key mb-0">Camp Name</p>
                      <p className="value mb-0">{selectedCamp?.campName}</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="d-flex align-items-start">
                    <img src="assets/images/campLocation.svg" alt="" />
                    <div className="ms-1">
                      <p className="key mb-0">Camp Location</p>
                      <p className="value mb-0">{selectedCamp?.campVenue}</p>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="d-flex align-items-start">
                    <img src="assets/images/campDate.svg" alt="" />
                    <div className="ms-1">
                      <p className="key mb-0">Camp Date</p>
                      <p className="value mb-0">{selectedCamp?.campDate}</p>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="d-flex align-items-start">
                    <img src="assets/images/campTime.svg" alt="" />
                    <div className="ms-1">
                      <p className="key mb-0">Camp Time</p>
                      <p className="value mb-0">{selectedCamp?.campTime}</p>
                    </div>
                  </div>
                </div>
                <div className="col-2 justify-content-right">
                  <div className="header_bg p-2">
                    <div>
                      <p className="mb-0">
                        Know more about <br /> Blood Donation
                      </p>
                      <a href="https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/donateblood.cnt">
                        Know More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex mb-3 mt-3">
            <div>
              <Radio.Group
                onChange={onChange}
                value={value}
                options={[
                  { value: 1, label: "Create or Link ABHA" },
                  { value: 2, label: "Mobile No." },
                ]}
              />
            </div>
          </div>

          {value === 2 ? (
            <>
              <div className="row pb-3">
                <div className={`col-${isValidated ? '12' : '4'}`}>
                  <div className="widget p-3">
                    <div className="d-flex align-items-end">
                      <div className="me-2">
                        <label className="form-label mb-1">
                          Enter Mobile No.
                        </label>
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
                      <p
                        className="mb-0 otp_generated mt-1"
                        style={{ color: "green" }}
                      >
                        Mobile number verified successfully
                      </p>
                    )}
                  </div>
                </div>

                {otpSent && !isValidated && (
                  <div className="col-8">
                    <div className="p-3 widget h-100">
                      <div className="d-flex align-items-center">
                        <Input
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={handleOtpChange}
                          style={{
                            marginRight: "10px",
                            letterSpacing: "0.5rem",
                          }}
                        />

                        {captchaImage && (
                          <div
                            className="d-flex align-items-center px-1"
                            style={{
                              marginRight: "10px",
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
                                  src="assets/images/refresh.png"
                                  alt="Refresh"
                                  style={{ height: "16px" }}
                                />
                              }
                            />
                          </div>
                        )}

                        <Input
                          placeholder="Enter CAPTCHA"
                          value={userCaptchaInput}
                          onChange={(e) => setUserCaptchaInput(e.target.value)}
                          style={{
                            marginRight: "10px",
                            letterSpacing: "0.5rem",
                          }}
                        />

                        <Button
                          type="primary"
                          onClick={handleValidateOTP}
                          loading={isValidating}
                        >
                          Validate
                        </Button>
                      </div>

                      {otpSent && timer > 0 && (
                        <p className="mb-0 otpExpire mt-1">
                          Your OTP will expire in{" "}
                          <span className="timer">{formatTime(timer)}</span>
                        </p>
                      )}

                      {otpSent && (
                        <Button
                          className="small_btn px-1"
                          onClick={handleResendOTP}
                          disabled={timer > 0}
                          style={{ height: "20px", marginTop: "8px" }}
                        >
                          Resend OTP
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {isValidated && (
                <div>
                  <h3 className="mb-1 camp_header">Camp Pre Registration</h3>
                  <div className="widget p-3">
                    <div className="row">
                      <div className="col-4">
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
                      <div className="col-4">
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
                            onChange={(e) =>
                              setFormData({ ...formData, age: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-4 d-flex align-items-center">
                        <div className="d-flex flex-column w-100">
                          <label htmlFor="gender" className="form-label mb-2">
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
                          <Input
                            placeholder="Enter your age"
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
                      <div className="col-4">
                        <div className="mb-3 form-inputs">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label mb-1"
                          >
                            Mobile<span className="mendate">*</span>
                          </label>
                          <Input
                            placeholder="Enter your age"
                            value={mobileNo}
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
                          <Input
                            placeholder="Enter your age"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
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
                      <div className="col-4 d-flex align-items-center">
                        <div className="d-flex flex-column w-100">
                          <label htmlFor="gender" className="form-label mb-2">
                            State<span className="mendate">*</span>
                          </label>
                          <Select
                            showSearch
                            allowClear
                            placeholder="Select State"
                            value={selectedState}
                            onChange={handleStateChange}
                            filterOption={(input, option) => {
                              const label = option?.label ?? "";
                              return label
                                .toLowerCase()
                                .includes(input.toLowerCase());
                            }}
                            options={states.map((state) => ({
                              value: state.stateCode,
                              label: state.stateName,
                            }))}
                          />
                        </div>
                      </div>
                      <div
                        className="col-4 d-flex align-items-center"
                        style={{ gap: "20px" }}
                      >
                        <div
                          className="d-flex flex-column"
                          style={{ width: "48%" }}
                        >
                          <label htmlFor="gender" className="form-label mb-2">
                            District<span className="mendate">*</span>
                          </label>
                          <Select
                            showSearch
                            allowClear
                            placeholder="Select District"
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            filterOption={(input, option) => {
                              const label = option?.label ?? "";
                              return label
                                .toLowerCase()
                                .includes(input.toLowerCase());
                            }}
                            options={districts.map((district) => ({
                              value: district.districtCode,
                              label: district.districtName,
                            }))}
                          />
                        </div>
                        <div
                          className="mb-3 form-inputs"
                          style={{ width: "48%" }}
                        >
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label mb-1"
                          >
                            Pincode
                          </label>
                          <Input
                            placeholder="Enter Pincode"
                            value={formData.pincode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pincode: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-end mt-3">
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
          ) : (
            <div>
              <p className="mb-0">ABHA in progress....</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
