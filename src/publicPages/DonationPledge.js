import React, { useState, useEffect } from "react";
import "../scss/donationPledge.scss";
import { Input, Button } from "antd";
import Swal from "sweetalert2";
import { BaseUrlSajal } from "../utils/url";
import axios from "axios";
import DonationPledgeForm from "./DonationPledgeForm";
import PledgeForm from "./PledgeForm";
import SuccessModal from "./SuccessModal";
import { generatePledgeCertificate } from "../utils/GeneratePledgeCertificate";
import { useSelector } from "react-redux";

export default function DonationPledge() {
  const [loading, setLoading] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  //   const [captchaImage, setCaptchaImage] = useState("");
  //   const [captchaText, setCaptchaText] = useState("");
  const [timer, setTimer] = useState(0);
  const [enteredOtp, setEnteredOtp] = useState("");
  //   const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [lastOtp, setLastOtp] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [showPledgeForm, setShowPledgeForm] = useState(false);
  //   const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pledgeDetails, setPledgeDetails] = useState(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  //   const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: null,
    email: "",
    state: null,
    district: null,
    pincode: "",
    language: null,
  });

  // Fetch states/districts from Redux
  const { statesWithDistricts = [] } = useSelector((state) => state.data);

  // Resolve state/district names from codes
  const stateName =
    statesWithDistricts.find((s) => s.stateCode === formData.state)
      ?.stateName || "";
  const districtName =
    statesWithDistricts
      .find((s) => s.stateCode === formData.state)
      ?.districts.find((d) => d.districtCode === formData.district)
      ?.districtName || "";

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobileNo(value);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setEnteredOtp(value);
    }
  };

  //   const handleCaptchaChange = (e) => {
  //     setEnteredCaptcha(e.target.value);
  //   };

  const validateMobileNo = () => {
    if (mobileNo.length !== 10) {
      Swal.fire({ text: "Mobile number must be 10 digits.", icon: "error" });
      return false;
    }
    if (!/^[6-9]/.test(mobileNo)) {
      Swal.fire({
        text: "Mobile number must start with 6, 7, 8, or 9.",
        icon: "error",
      });
      return false;
    }
    if (/^(\d)\1{9}$/.test(mobileNo)) {
      Swal.fire({
        text: "Mobile number cannot have all digits same.",
        icon: "error",
      });
      return false;
    }
    return true;
  };

  const sendOtp = async () => {
    if (!validateMobileNo()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${BaseUrlSajal}/eraktkosh/pledge/check`,
        { pledgerMobile: String(mobileNo) }
      );

      console.log("OTP API response:", response?.data);
      const responseData = response.data;

      // Case 1: Already pledged - open success modal
      if (responseData.details) {
        setPledgeDetails(responseData.details);
        setShowSuccessScreen(true);
        // setShowSuccessModal(true);
        // setModalVisible(true);
        return;
      }

      // Case 2: OTP flow
      setOtpSent(true);
      //   setCaptchaImage(responseData.captchaImage || "");
      //   setCaptchaText(responseData.captchaText || "");

      const otpValue =
        responseData.OtpData || responseData.otp || responseData.OTP;

      if (otpValue) {
        setLastOtp(String(otpValue));
        console.log("OTP received:", otpValue);
      } else {
        console.warn("No OTP found in API response");
        Swal.fire({
          text: "OTP not received. Please try again.",
          icon: "error",
        });
        return;
      }

      setTimer(300);

      Swal.fire({
        title: "Success",
        text: "OTP Sent Successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      Swal.fire({
        text: "Something went wrong while sending OTP.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  //   const handleRegenerateCaptcha = async () => {
  //     try {
  //       const captchaResponse = await axios.post(
  //         `${BaseUrlSajal}/eraktkosh/regenerateCaptcha`
  //       );
  //       const data = captchaResponse.data;
  //       setCaptchaImage(data.captchaImage);
  //       setCaptchaText(data.captchaText);
  //     } catch (error) {
  //       console.error("Error fetching captcha:", error);
  //       Swal.fire({
  //         text: "Something went wrong while loading captcha.",
  //         icon: "error",
  //       });
  //     }
  //   };

  const handleValidateOtp = async () => {
    if (enteredOtp.length !== 6) {
      Swal.fire({ text: "Please enter a valid 6-digit OTP.", icon: "error" });
      return;
    }

    // if (enteredCaptcha !== captchaText) {
    //   Swal.fire({ text: "Captcha does not match.", icon: "error" });
    //   return;
    // }

    if (enteredOtp !== lastOtp) {
      Swal.fire({
        text: `Invalid OTP. Please try again.`,
        icon: "error",
      });
      return;
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Success",
        text: "OTP Validated Successfully!",
        icon: "success",
      }).then(() => {
        setIsValidated(true);
      });
    } catch (error) {
      console.error("Error in validation process:", error);
      Swal.fire({
        text: "Something went wrong during validation.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Case 1: Already pledged → use API data
    if (pledgeDetails) {
      generatePledgeCertificate({
        name: pledgeDetails.pledgerName,
        state: pledgeDetails.stateEnglish,
        district: pledgeDetails.distEnglish,
        date: pledgeDetails.pledgeTime,
        backgroundImgUrl: "/assets/images/pledge_certi.jpg",
      });
    }
    // Case 2: New pledge → use form data
    else {
      generatePledgeCertificate({
        name: formData.name,
        state: stateName,
        district: districtName,
        date: new Date().toLocaleDateString("en-IN"),
        backgroundImgUrl: "/assets/images/pledge_certi.jpg",
      });
    }
  };

  const getContent = () => {
    // Already pledged flow
    if (pledgeDetails) {
      // If modal is open, show SuccessModal
      //   if (modalVisible) {
      //     return (
      //       <SuccessModal
      //         visible={modalVisible}
      //         onClose={() => {
      //           setModalVisible(false);
      //           setShowSuccessScreen(true); // after close, show success screen
      //         }}
      //         onDownload={handleDownload}
      //         title={`Thank you ${pledgeDetails.pledgerName} for taking the pledge!`}
      //         content={`You have already taken the Blood Donation Pledge from ${pledgeDetails.distEnglish}, ${pledgeDetails.stateEnglish}.`}
      //       />
      //     );
      //   }

      // If modal is closed → show success screen
      if (showSuccessScreen) {
        return (
          <div className="bg-border p-4 text-center">
            <img src="assets/images/success_icon.svg" alt="" />
            <h2 className="mb-3">
              Thank you {pledgeDetails.pledgerName}
            </h2>
            <p className="mb-4">
              You have already taken the <strong>Blood Donation Pledge</strong>{" "}
              from {pledgeDetails.distEnglish}, {pledgeDetails.stateEnglish}.
            </p>
            <Button
              type="secondary"
              onClick={handleDownload}
              className="px-4 me-3"
            >
              Download Certificate
            </Button>
            <Button
              onClick={() => setShowPledgeForm(false)}
              type="secondary"
              className="px-4"
            >
              Share
            </Button>
          </div>
        );
      }
    }

    // New pledge flow (normal)
    if (showPledgeForm) {
      return (
        <PledgeForm
          formData={formData}
          mobileNo={mobileNo}
          onBack={() => setShowPledgeForm(false)}
          showSuccessScreen={showSuccessScreen}
          setShowSuccessScreen={setShowSuccessScreen}
          //   modalVisible={modalVisible}
          //   setModalVisible={setModalVisible}
          onDownload={handleDownload}
        />
      );
    }

    if (isValidated) {
      return (
        <DonationPledgeForm
          mobileNo={mobileNo}
          continueCallBack={() => setShowPledgeForm(true)}
          formData={formData}
          setFormData={setFormData}
        />
      );
    }

    return (
      <div className="p-3 d-flex flex-wrap bg-border flex-column">
        <div className="d-flex gap-3">
          <div className="input-wrapper-field mb-2">
            <label className="form-label mb-0">Mobile Number</label>
            <Input
              value={mobileNo}
              onChange={handleMobileChange}
              maxLength={10}
              disabled={otpSent && timer > 0}
            />
          </div>
          {!otpSent ? (
            <div className="d-flex align-items-end mb-2">
              <Button
                className="px-4"
                key="submit"
                type="primary"
                loading={loading}
                onClick={sendOtp}
                disabled={otpSent && timer > 0}
              >
                Get OTP
              </Button>
            </div>
          ) : (
            <>
              <div className="input-wrapper-field mb-2">
                <label className="form-label mb-0">Enter OTP</label>
                <Input
                  value={enteredOtp}
                  onChange={handleOtpChange}
                  maxLength={6}
                />
              </div>
              <div className="d-flex align-items-end mb-2 gap-3">
                <Button
                  className="px-4"
                  key="submit"
                  type="secondary"
                  loading={loading}
                  disabled={timer > 0}
                  onClick={sendOtp}
                >
                  Resend OTP
                </Button>

                 <Button
                  className="px-4"
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={handleValidateOtp}
                >
                  Validate
                </Button>
              </div>
              {/* <div className="d-flex align-items-end">
               
              </div> */}
            </>
          )}
        </div>
        {otpSent && timer > 0 && (
          <p className="timer mb-0 mt-2">
            OTP will expire in{" "}
            <span>
              {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
            </span>
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="page_wrapper gradient_style pb-5">
        <div className="container">
          <div className="inside_header pt-3">
            <h4 className="header-page mb-1">Take the Blood Donation Pledge</h4>
            <div className="d-flex mb-2">
              <a className="home_link me-2" href="/beta#/">
                Home
              </a>
              <span className="home_link">&gt;</span>
              <a href="javascript:void(0)" className="home_link ms-2">
                Blood Donation Pledge
              </a>
            </div>
          </div>

          {getContent()}
        </div>
      </div>
    </>
  );
}
