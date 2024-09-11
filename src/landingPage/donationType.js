import React, { useState } from "react";

// TabList component 
const TabList = ({ tabs, setActiveTab }) => {
  return (
    <div className="tabs">
      <ul className="nav flex-column">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={index}>
            <a
              className={`nav-link py-3 ${tab.active ? "active" : ""}`}
              href="javascript:void(0)"
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// TabContent component 
const TabContent = ({ tabs }) => {
  const activeIndex = tabs.findIndex((tab) => tab.active);
  return (
    <div className="tabContent p-3">
      <div className={`row ${tabs[activeIndex].active ? "active" : ""}`}>
        <div className="col-xl-8 col-lg-8 col-12">
          <div className="tabContainer">
            <p className="ques mb-2">{tabs[activeIndex].label0}</p>
            <p className="ans">{tabs[activeIndex].content0}</p>
            <p className="ques mb-2">{tabs[activeIndex].label1}</p>
            <p className="ans">{tabs[activeIndex].content1}</p>
            <p className="ques mb-2">{tabs[activeIndex].label2}</p>
            <p className="ans">{tabs[activeIndex].content2}</p>
            <p className="ques mb-2">{tabs[activeIndex].label3}</p>
            <p className="ans">{tabs[activeIndex].content3}</p>
            <p className="ques mb-2">{tabs[activeIndex].label4}</p>
            <p className="ans">{tabs[activeIndex].content4}</p>
            <p className="ques mb-2">{tabs[activeIndex].label5}</p>
            <p className="ans">{tabs[activeIndex].content5}</p>
            <p className="ques mb-2">{tabs[activeIndex].label6}</p>
            <p className="ans">{tabs[activeIndex].content6}</p>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-12">
          <div className="img text-center">
            <img
              className="img-fluid"
              src={tabs[activeIndex].image}
              width="282px"
              height="410px"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DonationType() {

  const handleButtonClick = () => {
    window.location.href = '/BLDAHIMS/bloodbank/nearbyBBRed.cnt';
  };
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Packed Red Blood Cells",
      label0: "What is it?",
      content0:
        "Blood Collected straight from the donor into a blood bag and mixed with an anticoagulant is called as whole blood. This collected whole blood is then centrifuged and red cell, platelets and plasma are separated. The separated Red cells are mixed with a preservative to be called as packed red blood cells.",
      label1: "Who can donate?",
      content1: "You need to be 18-65 years old, weight 45kg or more and be fit and healthy.",
      label2: "User For?",
      content2: "Correction of severe anemia in a number of conditions and blood loss in case of child birth, surgery or trauma settings.",
      label3: "Lasts For?",
      content3: "Red cells can be stored for 42 days at 2-6 degree celsius.",
      label4: "How long does it take to donate?",
      content4: "15-30 minutes to donate.including the pre-donation check-up.",
      label5: "How often can I donate?",
      content5: "Male donors can donate again after 90 days and female donors can donate again after 120 days.",
      image: "assets/images/tabImg.png",
      active: activeTab === 0,
    },
    {
      label: "Plasma",
      label0: "What is it?",
      content0:
        "The straw-coloured liquid in which red blood cells, white blood cells, and platelets float in is called plasma.Contains special nutrients which can be used to create 18 different type of medical products to treat many different medical conditions. Plasma can be obtained from the collected whole blood after red blood cells and platelets have been separated. Additionally, it can also be collected using an apheresis equipment where other components are returned to the donor. The former is a common method of plasma preparation in our country.",
      label1: "Who can donate?",
      content1: "The donation criteria is similar to that of red blood cell. However, for apheresis plasma collection minimum weight is 50 kgs.",
      label2: "User For?",
      content2: "Used for bleeding patients with coagulation factor deficiency such as hemophilia A and B, von willibrand disease etc. also used in cases of blood loss due to trauma.",
      label3: "Lasts For?",
      content3: "Plasma after separation if frozen below -30 degrees can be stored up to one year.",
      label4: "How long does it take to donate?",
      content4: "15-30 minutes to donate including the pre-donation check-up.",
      label5: "How often can I donate?",
      content5: "similar to the red cell donation.",
      image: "assets/images/tabImg2.png",
      active: activeTab === 1,
    },
    {
      label: "Platelets",
      label0: "What is it?",
      content0:
        "These are cellular elements in blood which wedge together to help to clot and reduce bleeding. Always in high demand, Vital for people with low platelet count, like hematology and cancer patients.",
      label1: "Who can donate?",
      content1: "One can donate whole blood from which the blood centre will separate platelets from other components. Criteria similar to whole blood donation apply. Alternatively, one can donate using apheresis equipment where only platelets are collected and rest components are returned back to donate. One need to satisfy whole blood criteria and pre- donation screening which include negative infectious markers and platelet count >1,50,000 per microlitre of blood. Weight should be >50kgs.",
      label2: "User For?",
      content2: "Conditions with very low platelet count such as Cancer, blood diseases, trauma, dengue etc.",
      label3: "Lasts For?",
      content3: "can be stored for 5 days at 20-24 degree celsius.",
      label4: "How does it work?",
      content4: "We collect your blood, keep platelet and return rest to you by apheresis donation.",
      label5: "How long does it take?",
      content5: "45-60 minutes to donate. 2-3 hours for pre-donation screening.",
      label6: "How often can I donate?",
      content6: "Every 2 weeks but should not exceed more than 24 times in a year.",
      image: "assets/images/tabImg3.png",
      active: activeTab === 2,
    },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <section className="donationType mb-5">
        <div className="container">
          <section className="donationType mb-5">
            <div className="container">
              <div className="text-center pt-5 pb-5">
                <h3 className="section-heading mb-3">Types of Donation</h3>
                <p className="sectionTxt mb-0">
                  The average human body contains about five litres of blood,
                  which is made of several cellular and non-cellular components
                  such as
                  <span>Red blood cell, Platelet, and Plasma.</span>
                </p>
              </div>
              <div className="row">
                <div className="col-xl-3">
                  <TabList tabs={tabs} setActiveTab={handleTabClick} />
                </div>
                <div className="col-xl-9">
                  <TabContent tabs={tabs} />
                </div>
              </div>
              <div className="text-center mt-3">
                <button className="btn searchBtn" onClick={handleButtonClick}>
                  Find Nearest Blood Bank To Donate
                  <img
                    className="ms-2"
                    src="assets/images/fwdRight.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
