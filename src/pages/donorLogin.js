import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Input, Button } from "antd";
import { BaseUrl } from "../utils/url";
import "../scss/donorLogin.scss";
import Swal from "sweetalert2";

const CarouselContent = () => {
  return (
    <>
      <div className="container my-4">
        {/* <div id="carouselExampleDark" className="carousel carousel-dark slide"> */}
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner position-relative">
            {/* Static quote symbols */}
            <span className="carousel-quote quote-top-left">“</span>
            <span className="carousel-quote quote-bottom-right">”</span>
            <div className="carousel-item active">
              <div style={{ minHeight: "140px" }}>
                <div className="carousel-caption d-block">
                  <p>
                    You don't need to be a doctor to save lives. Just <br />{" "}
                    donate blood and become a real-life hero for <br /> someone
                    in need.
                  </p>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div style={{ minHeight: "140px" }}>
                <div className="carousel-caption d-block">
                  <p>
                    You don't need to be a doctor to save lives. Just <br />{" "}
                    donate blood and become a real-life hero for{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div style={{ minHeight: "140px" }}>
                <div className="carousel-caption d-block">
                  <p>
                    You don't need to be a doctor to save lives. Just <br />{" "}
                    someone in need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DonorLogin() {
  const [mobileno, setMobileNumber] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [captchaImage, setCaptchaImage] = useState(null);
  const [captchaText, setCaptchaText] = useState("");
  const otpRefs = useRef([]);
  const history = useHistory();
  const [timerId, setTimerId] = useState(null);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [loginStage, setLoginStage] = useState(0);

  useEffect(() => {
    document.title = "e-Raktkosh Donor Login";
  }, []);

  const handleMobileNumberChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
    }
  };

  const startOtpTimer = (expiryTime) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = expiryTime - currentTime;

    if (timeRemaining > 0) {
      setOtpExpiry(timeRemaining);
      setIsOtpExpired(false);

      if (timerId) {
        clearInterval(timerId);
      }

      const newTimerId = setInterval(() => {
        setOtpExpiry((prev) => {
          if (prev <= 1) {
            clearInterval(newTimerId);
            setIsOtpExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setTimerId(newTimerId);
    } else {
      setIsOtpExpired(true);
    }
  };

  const handleGenerateOtp = async () => {
    const isValidNumber = /^\d{10}$/.test(mobileno);

    if (!isValidNumber) {
      Swal.fire({
        text: "Please enter a valid 10-digit mobile number.",
        icon: "question",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/generateOTP`,
        { mobileno },
        {
          withCredentials: false,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response data:", response.data);

      setCaptchaImage(response.data.captchaImage);
      setCaptchaText("");

      const otpData = JSON.parse(response.data.OtpData);
      console.log("OTP Data: ", otpData);

      // Step 1: Check if isUserExists is present, if not, check eRaktkosh ....
      if (!otpData.hasOwnProperty("isUserExists")) {
        if (otpData.eRaktkosh === false && otpData.notRegisteredMessage) {
          Swal.fire({
            text: otpData.notRegisteredMessage,
            icon: "success",
          });
          setShowOtpField(true);
          setIsInputDisabled(true);
          return;
        }
      }

      // Step 2: If user exists, check OTP field ....
      if (otpData.isUserExists) {
        if (otpData.otp) {
          Swal.fire({
            text: otpData.messageSuccess,
            icon: "success",
          });
          setLoginStage(1);

          console.log("OTP:", otpData.otp);
          console.log("OTP Expiration Time:", otpData.otpExpirationTime);

          setShowOtpField(true);
          setIsInputDisabled(false);
          startOtpTimer(Math.floor(otpData.otpExpirationTime / 1000));
          return;
        }

        // Step 3: If OTP is not there, check for errorMessage ....
        if (otpData.errorMessage) {
          Swal.fire({
            text: otpData.errorMessage,
            icon: "error",
          });
          setShowOtpField(false);
          setIsInputDisabled(true);
          return;
        }

        // Step 4: if otp limit is crossed ....
        if (otpData.limitExceedMessage) {
          Swal.fire({
            text: otpData.limitExceedMessage,
            icon: "error",
          });
          setShowOtpField(false);
          setIsInputDisabled(true);
          return;
        }
      }
    } catch (error) {
      console.error(
        "Error generating OTP:",
        error.response || error.message || error
      );
      Swal.fire({
        text: "An error occurred while generating OTP.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, event) => {
    const { value } = event.target;

    if (/^\d$/.test(value)) {
      otpRefs.current[index].value = value;

      if (index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      if (index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
  };

  const handleClick = async () => {
    history.push("/pages/portaldonorRegister");
  };

  const handleCaptchaChange = (event) => {
    setCaptchaText(event.target.value);
  };

  const handleResendOtp = async () => {
    try {
      setLoginStage(0);
      const response = await axios.post(`${BaseUrl}/eraktkosh/regenerateOtp`, {
        mobileno,
      });
      console.log("Resend OTP Response:", response.data);

      const otpData = JSON.parse(response.data.OtpData);
      const otpExpirationTime = Math.floor(otpData.otpExpirationTime / 1000);

      Swal.fire({
        text: "OTP has been resent.",
        icon: "success",
      });
      setIsOtpExpired(false);
      startOtpTimer(otpExpirationTime);
      setLoginStage(1);
    } catch (error) {
      console.error("Error resending OTP:", error);
      Swal.fire({
        text: "An error occurred while resending the OTP.",
        icon: "error",
      });
    }
  };

  const handleRefreshCaptcha = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/regenerateCaptcha`
      );
      console.log("Refresh CAPTCHA Response:", response.data);
      setCaptchaImage(response.data.captchaImage);
      setCaptchaText("");
    } catch (error) {
      console.error(
        "Error refreshing CAPTCHA:",
        error.response || error.message || error
      );
      Swal.fire({
        text: "An error occurred while refreshing the CAPTCHA.",
        icon: "error",
      });
    }
  };

  const handleValidate = async () => {
    const otpValues = otpRefs.current.map((input) => input.value).join("");

    if (otpValues.length !== 6 || !captchaText) {
      Swal.fire({
        text: "Please fill in both OTP and Captcha.",
        icon: "question",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/eraktkosh/validate`, {
        captcha: captchaText,
        mobile_no: mobileno,
        otp: otpValues,
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Validation Response:", response);

        const mobileNo = response.data?.userDetails?.body?.mobileno;
        const token = response.data?.token;

        if (mobileNo && token) {
          console.log("Mobile No:", mobileNo);
          console.log("Token:", token);

          // First, update the UI to show truck moving to 100%
          setLoginStage(2);

          // Then wait for animation to complete (1 second as per your CSS transition)
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Now store data and redirect
          sessionStorage.setItem("mobileNo", mobileNo);
          sessionStorage.setItem("authToken", token);

          setShowOtpField(false);
          setIsInputDisabled(false);
          setLoading(false);

          const newTabUrl = `${window.location.origin}/beta#/pages/portaldonorAdmin`;
          window.location.assign(newTabUrl);
        } else {
          Swal.fire({
            text: "Failed to fetch mobile number or token from response.",
            icon: "error",
          });
          setLoading(false);
        }
      } else if (response.status === 401) {
        sessionStorage.clear();
        Swal.fire({
          text: "Unauthorized access. Please try again.",
          icon: "error",
        });
        setLoading(false);
      } else {
        Swal.fire({
          text: `Validation failed with status code: ${response.status}`,
          icon: "error",
        });
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
          case 401:
            Swal.fire({
              text: "Invalid OTP or CAPTCHA. Please try again.",
              icon: "error",
            });
            break;
          case 500:
            Swal.fire({
              text: "Server error. Please try again later.",
              icon: "error",
            });
            break;
          default:
            Swal.fire({
              text: `An error occurred. Status code: ${error.response.status}`,
              icon: "error",
            });
        }
        console.error("Error response:", error.response);
      } else {
        Swal.fire({
          text: "An error occurred while validating OTP and Captcha.",
          icon: "error",
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* {loading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )} */}
      <section className="donorlogin">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-7 d-none d-lg-block d-xl-block d-md-block col-lg-7 col-md-7">
              <div className="donorImg p-5">
                <div className="px-4 py-3">
                  <h2 className="mb-2 donor_page_header">Donor Login</h2>
                  <p className="mb-2 img_text">Donate, Track, and Save Lives</p>
                  <div className="d-flex align-items-center">
                    <img
                      style={{ width: "206px", height: "287px" }}
                      src="assets/images/donor-img.png"
                      alt=""
                    />
                    <CarouselContent />
                  </div>
                  <p className="sign_up_txt mb-2 mt-4">Log In/Sign Up Now!</p>
                  <p className="welcome_msg mb-2">
                    Find Nearby Blood Camps | Track Your Donation History |
                    View/Add Your Donations | Update Your Profile
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 d-flex flex-column align-items-center">
              <div className="" style={{ width: "60%" }}>
                <div className="donorlogin-right mb-4">
                  <div className="loginBox">
                    <div className="text-center mb-3">
                      <h2 className="login-header text-center mb-1">
                        Sign in to <span className="">e-Raktkosh</span>
                      </h2>
                      <p className="welcome_msg">
                        Welcome to e-Raktkosh! Sign in to track donations, find{" "}
                        <br /> camps, and help save lives.
                      </p>
                    </div>
                    <div className="mb-1">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label mb-1"
                      >
                        Enter Mobile No.
                      </label>
                      <Input
                        style={{ letterSpacing: "0.1rem" }}
                        placeholder=""
                        type="text"
                        id="username"
                        value={mobileno}
                        onChange={handleMobileNumberChange}
                        disabled={isInputDisabled}
                      />
                    </div>
                    {showOtpField && (
                      <div>
                        <p className="mb-1 otp_field">
                          OTP has been sent to your mobile no.
                        </p>
                        <div className="d-flex align-items-center mb-3 justify-content-between">
                          <div className="captcha_container d-flex align-items-center justify-content-around">
                            {captchaImage && (
                              <img src={captchaImage} alt="CAPTCHA" />
                            )}
                            <img
                              className=""
                              style={{ cursor: "pointer" }}
                              src="assets/images/refresh.png"
                              alt=""
                              onClick={handleRefreshCaptcha}
                            />
                          </div>
                          <div className="" style={{ width: "48%" }}>
                            <Input
                              style={{ letterSpacing: "0.5rem" }}
                              placeholder=""
                              type="text"
                              value={captchaText}
                              onChange={handleCaptchaChange}
                            />
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="otp-input">
                            {Array(6)
                              .fill("")
                              .map((_, index) => (
                                <input
                                  key={index}
                                  type="text"
                                  maxLength="1"
                                  required
                                  ref={(el) => (otpRefs.current[index] = el)}
                                  onChange={(event) =>
                                    handleOtpChange(index, event)
                                  }
                                  className={`otp-field ${index > 0 ? "" : ""}`}
                                  autoFocus={index === 0}
                                />
                              ))}
                          </div>
                        </div>

                        {isOtpExpired ? (
                          <div>
                            <p className="mb-0 otpExpiryText">
                              Your OTP has been expired.
                            </p>
                            <p className="mb-1 otpExpiryText">
                              Please Click on Resend OTP button
                            </p>
                          </div>
                        ) : (
                          <p className="otpExpiry">
                            Your OTP will expire in{" "}
                            <span className="timer">
                              {Math.floor(otpExpiry / 60)
                                .toString()
                                .padStart(2, "0")}
                              :{String(otpExpiry % 60).padStart(2, "0")} min
                            </span>{" "}
                          </p>
                        )}

                        <div className="text-center">
                          {isOtpExpired && (
                            <div>
                              <Button type="primary" onClick={handleResendOtp}>
                                Resend OTP
                              </Button>
                            </div>
                          )}
                        </div>
                        {!isOtpExpired && (
                          <Button type="primary" onClick={handleValidate}>
                            Validate
                          </Button>
                        )}
                      </div>
                    )}
                    {!showOtpField && !loading && (
                      <Button
                        type="primary"
                        className="mt-3"
                        onClick={handleGenerateOtp}
                      >
                        {" "}
                        Generate OTP
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <p className="welcome_msg me-3 mb-0">Don't Have an Account?</p>
                <Button
                  className="register_btn"
                  style={{ padding: "12px" }}
                  type="primary"
                  onClick={handleClick}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="donorLogin_footer">
          <div className="building_wrapper">
            <div className="building_track">
              <img
                className="building_img"
                src="assets/images/Building.png"
                alt=""
              />
              <img
                className="building_img"
                src="assets/images/Building.png"
                alt=""
              />
            </div>
          </div>
          <div
            className={`progress_line ${loginStage >= 1 ? "stage-1" : ""} ${
              loginStage >= 2 ? "stage-2" : ""
            }`}
          ></div>
          <img
            className={`truck_img ${loginStage >= 1 ? "stage-1" : ""} ${
              loginStage >= 2 ? "stage-2" : ""
            }`}
            src="assets/images/truck.svg"
            alt=""
          />
        </div>
      </section>
    </>
  );
}
