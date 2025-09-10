import React, { useState } from "react";
import { Button, Checkbox } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { BaseUrl, BaseUrlSajal } from "../utils/url";
import { useSelector } from "react-redux";

export default function PledgeForm({
  formData,
  onBack,
  mobileNo,
  showSuccessScreen,
  setShowSuccessScreen,
  onDownload,
  onShare,
}) {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!agreed) {
      Swal.fire({
        text: "You must agree to the pledge before submitting.",
        icon: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const requestBody = {
        pledgerName: formData.name,
        pledgerAge: formData.age,
        pledgerGender: formData.gender,
        pledgerStateCode: formData.state,
        pledgerDistrictCode: formData.district,
        pledgerEmail: formData.email,
        pledgerMobile: mobileNo,
        pledgerLang: formData.language,
        pledgerPincode: formData.pincode,
      };

      const response = await axios.post(
        `${BaseUrl}/eraktkosh/pledge`,
        requestBody
      );

      if (response.status === 200) {
        setShowSuccessScreen(true);
      }
    } catch (error) {
      console.error("Error submitting pledge:", error);
      Swal.fire({
        text: "Something went wrong while submitting your pledge.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // If success screen is shown, replace PledgeForm UI
  if (showSuccessScreen) {
    return (
      <div className="bg-border p-4 text-center">
        <img src="assets/images/success_icon.svg" alt="" />
        <h2 className="mt-3 mb-2 pledge_header">
          Thank you <span className="pledge_name">{formData.name}</span> for
          taking the pledge!
        </h2>
        <p className="mb-4 pledge_text">
          You have successfully taken the Blood Donation Pledge
        </p>
        <Button
          type="secondary"
          onClick={onDownload}
          className="px-4 me-3 mb-3"
        >
          Download Certificate
        </Button>
        <Button onClick={onShare} type="secondary" className="px-4">
          Share
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Pledge Form */}
      {formData.language === "2" ? (
        <div className="bg-border p-3">
          <h3 className="mb-1 header_details">शपथ</h3>
          <p className="mb-2 content_pledge p-0">
            राष्ट्रीय स्वैच्छिक रक्तदान दिवस, 2025
          </p>

          <div>
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mb-4"
            >
              <span className="form_data mb-4">
                मैं, <strong className="form_data_name">{formData.name}</strong>
                , निवासी{" "}
                <strong className="form_data_name">
                  {districtName}, {stateName}
                </strong>
                , आज, 01 October 2025, राष्ट्रीय स्वैच्छिक रक्तदान दिवस के दिन
                यह शपथ लेता/लेती हूँ कि मैं अपना रक्त नियमित रूप से दान
                करूँगा/करूँगी।
              </span>
            </Checkbox>

            <p className="form_data mb-4 ps-3">
              भारत में रक्त की आवश्यकता को ध्यान में रखते हुए, मैं यह भी संकल्प
              लेता/लेती हूँ कि अपने परिवार के सदस्यों, मित्रों, रिश्तेदारों,
              सहकर्मियों और आम जनता के बीच नियमित, स्वैच्छिक, नि:शुल्क रक्तदान
              की आवश्यकता के बारे में जागरूकता फैलाऊँगा/फैलाऊँगी।
            </p>

            <p className="form_data mb-4 ps-3">
              इसके साथ ही, मैं यह भी संकल्प लेता/लेती हूँ कि जब भी किसी को रक्त
              की आवश्यकता होगी, मैं बिना किसी लालच और भेदभाव के रक्तदान
              करूँगा/करूँगी।
            </p>

            <p className="form_data mb-4 ps-3">
              मैं निरंतर प्रयास करूँगा/करूँगी कि हमारे आसपास रक्त की कमी के कारण
              कोई जीवन न खोए।
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-border p-3">
          <h3 className="mb-1 header_details">Pledge Form</h3>
          <p className="mb-2 content_pledge p-0">
            National Voluntary Blood Donation Day 2025
          </p>

          <div>
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mb-4"
            >
              <span className="form_data mb-1">
                I <strong className="form_data_name">{formData.name}</strong>, a
                resident of{" "}
                <strong className="form_data_name">
                  {districtName}, {stateName}
                </strong>
                , today, on 1st October 2025, National Voluntary Blood Donor
                Day, do hereby pledge to donate my blood regularly.
              </span>
            </Checkbox>

            <p className="form_data mb-4 ps-3">
              Keeping in view the need for blood in India. I also undertake to
              create awareness amongst my family members, friends, relatives,
              colleagues and the public about the need for regular, voluntary,
              unpaid blood donation.
            </p>

            <p className="form_data mb-4 ps-3">
              Along with this, I also undertake that whenever someone is in need
              of blood, I shall donate blood without any greed and without any
              discrimination.
            </p>

            <p className="form_data mb-4 ps-3">
              I will make relentless efforts so that no life is lost around us
              due to shortage of blood.
            </p>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-end gap-3 mt-4">
        <Button
          type="primary"
          className="px-4"
          onClick={handleSubmit}
          disabled={!agreed}
          loading={loading}
        >
          Submit My Pledge
        </Button>
        <Button type="secondary" className="px-4" onClick={onBack}>
          Back
        </Button>
      </div>
    </>
  );
}
