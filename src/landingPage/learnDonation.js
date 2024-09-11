import React, { useState, useEffect } from "react";

export default function LearnDonation() {

  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  const bloodGroupData = {
    "A+": {
      canDonateTo: ["A+", "AB+"],
      canTakeFrom: ["O+", "O-", "A+", "A-"],
    },
    "O+": {
      canDonateTo: ["O+", "A+", "B+", "AB+"],
      canTakeFrom: ["O+", "O-"],
    },
    "B+": {
      canDonateTo: ["B+", "AB+"],
      canTakeFrom: ["O+", "O-", "B+", "B-"],
    },
    "AB+": {
      canDonateTo: ["AB+"],
      canTakeFrom: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    },
    "A-": {
      canDonateTo: ["A+", "A-", "AB+", "AB-"],
      canTakeFrom: ["O-", "A-"],
    },
    "O-": {
      canDonateTo: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      canTakeFrom: ["O-"],
    },
    "B-": {
      canDonateTo: ["B+", "B-", "AB+", "AB-"],
      canTakeFrom: ["O-", "B-"],
    },
    "AB-": {
      canDonateTo: ["AB+", "AB-"],
      canTakeFrom: ["O-", "A-", "B-", "AB-"],
    },
  };

  useEffect(() => {
    setSelectedBloodGroup("A+");
  }, []);

  const handleBloodGroupSelect = (bloodGroup) => {
    setSelectedBloodGroup(bloodGroup);
  };

  const renderBloodGroupInfo = () => {
    const bloodGroupToShow = selectedBloodGroup || "A+";

    if (bloodGroupData[bloodGroupToShow]) {
      const { canDonateTo, canTakeFrom } = bloodGroupData[bloodGroupToShow];

      return (
        <>
          <div className="col-12">
            <div className="org-container d-flex py-2 px-3">
              <img src="assets/images/person-img.png" alt="" />
              <div className="d-flex flex-column justify-content-center ms-5 me-3">
                <p className="org-text mb-3">You can take from</p>
                <div className="d-flex flex-wrap">
                  {canTakeFrom.map((bloodGroup) => (
                    <p key={bloodGroup} className="org-text">
                      {bloodGroup}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="blue-container d-flex py-2 px-3 mt-3">
              <img src="assets/images/person-img.png" alt="" />
              <div className="d-flex flex-column justify-content-center ms-5 me-3">
                <p className="org-text mb-3">You can give to</p>
                <div className="d-flex flex-wrap">
                  {canDonateTo.map((bloodGroup) => (
                    <p key={bloodGroup} className="org-text">
                      {bloodGroup}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <section className="learn-donation">
        <div className="bg-img">
          <div className="container">
            <h3 className="section-heading text-center mt-5">
              Learn About Donation
            </h3>

            <div className="d-flex justify-content-center align-items-center">
              <div className="">
                <p className="label mb-1">Select your Blood Type</p>
                <div className="d-flex flex-wrap">
                  {Object.keys(bloodGroupData).map((bloodGroup) => (
                    <button
                      key={bloodGroup}
                      className={`btn selectBtn mb-3 mb-xl-0 ${selectedBloodGroup === bloodGroup ? "active" : ""
                        }`}
                      onClick={() => handleBloodGroupSelect(bloodGroup)}
                    >
                      {bloodGroup}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-10 col-12 d-flex justify-content-center">
                <div className="mt-3 select-container">
                  <div className="row">
                    <div className="px-4 py-3 col-xl-7 col-lg-7 col-md-7 col-12">
                      <div className="row">
                        {renderBloodGroupInfo()}
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center pe-xl-5 pe-lg-5 col-xl-5 col-lg-5 col-md-5 col-12">
                      <img src="assets/images/doctor.png" alt="" />
                      <p className="donate-blood-txt mb-0">
                        One Blood Donation can save upto{" "}
                        <span className="">Three</span> Lives
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
