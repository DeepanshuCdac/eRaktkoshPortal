import React, { useState, useEffect } from "react";
import "../scss/donationPledge.scss";
import { Input, Button } from "antd";
import Swal from "sweetalert2";
import { BaseUrl, BaseUrlSajal } from "../utils/url";
import axios from "axios";
import DonationPledgeForm from "./DonationPledgeForm";
import PledgeForm from "./PledgeForm";
import { generatePledgeCertificate } from "../utils/GeneratePledgeCertificate";
import { useSelector } from "react-redux";

export default function DonationPledge() {
  const [loading, setLoading] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [lastOtp, setLastOtp] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [showPledgeForm, setShowPledgeForm] = useState(false);
  const [pledgeDetails, setPledgeDetails] = useState(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
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
        `${BaseUrl}/eraktkosh/pledge/check`,
        { pledgerMobile: String(mobileNo) }
      );

      console.log("OTP API response:", response?.data);
      const responseData = response.data;

      if (responseData.OtpData === "OTP Sent") {
        Swal.fire({
          title: "Success",
          text: "OTP Sent Successfully!",
          icon: "success",
        });
        setOtpSent(true);
        setTimer(300);
        return;
      }

      const otpValue =
        responseData.OtpData || responseData.otp || responseData.OTP;

      if (responseData.OtpData === "Try After 5 Minutes") {
        Swal.fire({
          //   title: "Try Later",
          text: `${responseData.OtpData}`,
          icon: "error",
        });
        return;
      }

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

  const handleValidateOtp = async () => {
    if (enteredOtp.length !== 6) {
      Swal.fire({ text: "Please enter a valid 6-digit OTP.", icon: "error" });
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${BaseUrl}/eraktkosh/pledge/validate`,
        {
          pledgerMobile: String(mobileNo),
          OTP: enteredOtp,
        }
      );

      const responseData = response.data;
      console.log("Validate OTP response:", responseData);

      if (responseData.details === "false") {
        // New pledge flow
        Swal.fire({
          title: "Success",
          text: "OTP Validated Successfully!",
          icon: "success",
        }).then(() => {
          setIsValidated(true);
        });
      } else if (
        typeof responseData.details === "string" &&
        responseData.details.toLowerCase().includes("invalid otp")
      ) {
        // Invalid OTP
        Swal.fire({
          text: "Invalid OTP. Please try again.",
          icon: "error",
        });
      } else if (typeof responseData.details === "object") {
        // Already pledged
        Swal.fire({
          title: "Success",
          text: "OTP Validated Successfully!",
          icon: "success",
        }).then(() => {
          setPledgeDetails(responseData.details);
          setShowSuccessScreen(true);
        });
      } else {
        Swal.fire({
          text: "Unexpected response. Please try again.",
          icon: "error",
        });
      }
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

  const getContent = () => {
    // Already pledged flow
    if (pledgeDetails) {
      if (showSuccessScreen) {
        return (
          <div className="bg-border p-4 text-center">
            <img src={`${process.env.PUBLIC_URL}/assets/images/success_icon.svg`} alt="" />
            <h2 className="mt-3 mb-2 pledge_header">
              Thank you{" "}
              <span className="pledge_name">{pledgeDetails.pledgerName}</span>
            </h2>
            <p className="mb-4 pledge_text">
              You have already taken the Blood Donation Pledge from{" "}
              <span className="pledge_name">{pledgeDetails.distEnglish}</span>,{" "}
              <span className="pledge_name">{pledgeDetails.stateEnglish}</span>.
            </p>
            <div className="gap-3">
              <Button
                type="secondary"
                onClick={handleDownload}
                className="px-4 me-3 mb-3"
              >
                Download Certificate
              </Button>
              <Button onClick={handleShare} type="secondary" className="px-4">
                Share
              </Button>
            </div>
          </div>
        );
      }
    }

    if (showPledgeForm) {
      return (
        <PledgeForm
          formData={formData}
          mobileNo={mobileNo}
          onBack={() => setShowPledgeForm(false)}
          showSuccessScreen={showSuccessScreen}
          setShowSuccessScreen={setShowSuccessScreen}
          onDownload={handleDownload}
          onShare={handleShare}
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
        <div className="d-xl-flex d-lg-flex d-md-flex d-block gap-3">
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
            <div className="d-flex align-items-end justify-content-center mb-2">
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
              <div className="d-flex align-items-end mb-2 gap-3 justify-content-center">
                <Button
                  className="px-5"
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={handleValidateOtp}
                >
                  Validate
                </Button>

                <Button
                  className="px-2"
                  key="submit"
                  type="secondary"
                  loading={loading}
                  disabled={timer > 0}
                  onClick={sendOtp}
                >
                  Resend OTP
                </Button>
              </div>
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

  const handleShare = () => {
    const url = `${BaseUrl}/eraktkosh/pledge/certificate?mobile=${mobileNo}`;

    // const encodedUrl = encodeURIComponent(url);

    // const whatsappUrl = `https://wa.me/?text=${encodedUrl}`;
    // window.open(whatsappUrl, "_blank");

    const encodedUrl = encodeURIComponent(url);

  const whatsappUrl = `whatsapp://send?text=${encodedUrl}`;
  window.location.href = whatsappUrl;
  };

  const handleDownload = () => {
    if (pledgeDetails) {
      generatePledgeCertificate({
        name: pledgeDetails.pledgerName,
        state: pledgeDetails.stateEnglish,
        district: pledgeDetails.distEnglish,
        date: pledgeDetails.pledgeTime,
        backgroundImgUrl: `${process.env.PUBLIC_URL}/assets/images/pledge_certi.jpg`,
      });
    } else {
      const today = new Date();
      const formattedDate = today
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/\s+/g, "-");

      generatePledgeCertificate({
        name: formData.name,
        state: stateName,
        district: districtName,
        date: formattedDate,
        backgroundImgUrl: `${process.env.PUBLIC_URL}/assets/images/pledge_certi.jpg`,
      });
    }
  };

  return (
    <>
      <div className="page_wrapper page-wrapper gradient_style pb-5">
        <div className="container">
          <div className="inside_header pt-3">
            <h4 className="header-page mb-1">Take the Blood Donation Pledge</h4>
            <div className="d-flex mb-2">
              <a className="home_link me-2" href="/eraktkoshPortal/#/">
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
