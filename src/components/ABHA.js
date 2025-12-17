import React, { useState } from "react";
import { Button, Modal, Dropdown, Space, Checkbox, Input, Select } from "antd";
import "../scss/abha.scss";
import Swal from "sweetalert2";

const ABHA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [checkedStates, setCheckedStates] = useState(new Array(7).fill(true));
  const [verificationInput, setVerificationInput] = useState("");
  const [isCreatingAbha, setIsCreatingAbha] = useState(false);
  const [adharInput, setAdharInput] = useState("");
  const [mobileInput, setMobileInput] = useState("");
  const [isRotating, setIsRotating] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setCheckedStates(new Array(7).fill(true));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsCreatingAbha(false);
  };

  const handleShowData = () => {
    setIsTextVisible((prev) => !prev);
  };

  const handleCheckboxChange = (index) => {
    setCheckedStates((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleVerification = () => {
    if (!verificationInput.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Input field cannot be empty. Please enter a value.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Verification successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSubmit = () => {
    if (!adharInput.trim() || !mobileInput.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Input field cannot be empty. Please enter a value.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Verification successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRefresh = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
    setIsCreatingAbha(false);
    setAdharInput("");
    setMobileInput("");
    setVerificationInput("");
    setCheckedStates(new Array(7).fill(true));
    setIsTextVisible(true);
  };

  return (
    <>
      <div>
        <div className="widget-abha d-flex justify-content-between px-4 pt-4 align-items-center">
          <div>
            <Button type="primary" onClick={showModal}>
              Generate/Verify ABHA
            </Button>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/abha-img.png`}
            alt="Abha-img"
          />
        </div>
      </div>
      <Modal
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>ABHA Creation/ Verification</span>
            <span className="me-4">
              <Button
                className={isRotating ? "rotate-refresh" : ""}
                onClick={handleRefresh}
                style={{ background: "#fff", border: "none" }}
              >
                <img
                  style={{ width: "18px" }}
                  src={`${process.env.PUBLIC_URL}/assets/images/refresh.png`}
                />{" "}
              </Button>
            </span>{" "}
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="body mb-4 align-items-center py-2">
          {isCreatingAbha ? (
            // ABHA Creation Section
            <div className="d-flex align-items-center justify-content-between">
              <label>
                <span style={{ color: "red" }}>*</span> Verify Via:
              </label>
              <Select
                showSearch
                style={{ width: 150, height: 32 }}
                placeholder="Search to Select"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  { value: "1", label: "Mobile_OTP" },
                  { value: "2", label: "Aadhaar_OTP" },
                  { value: "3", label: "Aadhaar_BIO" },
                  { value: "4", label: "Aadhaar_DEMO" },
                ]}
              />
              <Input
                onChange={(e) => setAdharInput(e.target.value)}
                style={{ width: "25%" }}
                placeholder="Enter Aadhaar Number"
              />
              <Input
                onChange={(e) => setMobileInput(e.target.value)}
                style={{ width: "25%" }}
                placeholder="Enter Mobile Number"
              />
              <Button
                onClick={handleSubmit}
                type="primary"
                style={{ marginRight: "10px" }}
              >
                Submit
              </Button>
            </div>
          ) : (
            // Verification Section
            <div className="row align-items-center">
              <div className="col-8">
                <div className="d-flex align-items-center justify-content-between">
                  <label>
                    <span style={{ color: "red" }}>*</span> Verify Via:
                  </label>
                  <Select
                    showSearch
                    style={{
                      width: 150,
                      height: 32,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      { value: "1", label: "Abha Address" },
                      { value: "2", label: "Abha Name" },
                      { value: "3", label: "Mobile" },
                      { value: "4", label: "Aadhaar" },
                      { value: "5", label: "Abha Search via Mobile" },
                    ]}
                  />
                  <Input
                    value={verificationInput}
                    onChange={(e) => setVerificationInput(e.target.value)}
                    style={{ width: "35%" }}
                    placeholder="abc@abdm"
                  />
                  <Button onClick={handleVerification} type="primary">
                    Verify
                  </Button>
                </div>
              </div>
              <div className="col-1">
                <p className="mb-0">OR</p>
              </div>
              <div className="col-3">
                <Button type="primary" onClick={() => setIsCreatingAbha(true)}>
                  Create ABHA Number
                </Button>
              </div>
            </div>
          )}
        </div>
        <div>
          <p>
            <span style={{ color: "red" }}>*</span> I hereby declare that:
            <Button className="ms-3" onClick={handleShowData} type="primary">
              {isTextVisible ? "Hide" : "Show"}
            </Button>
          </p>
        </div>
        {isTextVisible && (
          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            {[
              'I am voluntarily sharing my Aadhaar Number / Virtual ID issued by the Unique Identification Authority of India ("UIDAI"), and my demographic information for the purpose of creating an Ayushman Bharat Health Account number ("ABHA number") and Ayushman Bharat Health Account address ("ABHA Address"). I authorize NHA to use my Aadhaar number / Virtual ID for performing Aadhaar-based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, or response of "Yes" with NHA upon successful authentication.',
              'I intend to create Ayushman Bharat Health Account Number ("ABHA number") and Ayushman Bharat Health Account address ("ABHA Address") using a document other than Aadhaar. (Click here to proceed further)',
              "I consent to the usage of my ABHA address and ABHA number for linking my legacy (past) government health records and those which will be generated during this encounter.",
              "I authorize the sharing of all my health records with healthcare provider(s) for the purpose of providing healthcare services to me during this encounter.",
              "I consent to the anonymization and subsequent use of my government health records for public health purposes.",
              "I, the user, confirm that I have duly informed and explained the beneficiary of the contents of consent for the aforementioned purposes.",
              "I, the beneficiary, have been explained about the consent as stated above and provide my consent for the aforementioned purposes.",
            ].map((text, index) => (
              <Checkbox
                key={index}
                checked={checkedStates[index]}
                onChange={() => handleCheckboxChange(index)}
              >
                {text}
              </Checkbox>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};
export default ABHA;
