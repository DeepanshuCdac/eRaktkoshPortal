import React from "react";
import "../scss/aboutEraktkosh.scss";

const AboutEraktkosh = () => {
  return (
    <>
      <div className="pageWrapper page-wrapper">
        <div className="container">
          <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between py-3">
            <div className="d-flex align-items-center">
              <div className="inside_header">
                <h4 className="header-page mb-1">About eRaktkosh</h4>
                <div className="d-flex">
                  <a className="home_link me-2" href="/beta#/">
                    Home
                  </a>
                  <span className="home_link">&gt;</span>
                  <a href="javascript:void(0)" className="home_link ms-2">
                    About eRaktkosh
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="body_wrapper py-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-8 col-lg-8 col-md-8 col-sm-8 mb-3">
              <h4 className="header-page mb-1">
                e-Raktkosh: A Centralized Blood Center Management System
              </h4>
              <p className="text_section mb-0">
                eRaktkosh was Inaugurated on 7th April 2016 by Hon'ble Minister
                of Health and Family Welfare, Sh. JP Nadda.
              </p>
              <br></br>
              <p className="text_section mb-0">
                e-Raktkosh enforces Drug & Cosmetic Act, National Blood Policy
                standards and guidelines ensuring proper collection & donation,
                effective management and monitoring the quality and quantity of
                the donated blood. Considering the national roll out, e-Raktkosh
                has been developed with modular and scalable approach with
                configurable rule based architecture allowing customization to
                easily incorporate specific requirements from nationwide
                stakeholders.
              </p>
            </div>
            <div className="col-12 col-xl-4 col-lg-4 col-md-4 col-sm-4">
              <div className="d-flex flex-column align-items-center mb-3">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/pdf-icon.png`}
                  alt="PDF Icon"
                  style={{ height: "165px" }}
                />
                <div className="d-flex align-items-center">
                  <img
                    className="me-1"
                    src={`${process.env.PUBLIC_URL}/assets/images/download_pdf.svg`}
                    alt=""
                  />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/assets/pdf/eRaktKoshBrouchure"
                    download="eRaktKoshBrouchure.pdf"
                  >
                    Click here to download
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <div className="widget p-3">
                <h3 className="header-page mb-2">Objectives</h3>
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/supplies.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">
                        Safe and Adequate Blood Supplies
                      </p>
                    </div>
                  </div>
                  <div className="col-4 ">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/turnaround.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">
                        Reduced Turnaround Time
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/wastage.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">
                        Preventing Wastage of Blood
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/donors.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">
                        Restrict Professional Donors
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src="assets/images/networking.jpg"
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">
                        Networking of Blood Centers
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/DonorRepository.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">Donor Repository</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <div className="widget p-3 h-100">
                <h3 className="header-page mb-2">Salient Features</h3>
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/web.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">
                        Web Based
                        <br /> Application
                      </p>
                    </div>
                  </div>
                  <div className="col-4 ">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/aadhar.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">Aadhar Linkage</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/support.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">Decision Suppport</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/guidelines.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">Enforces Guidelines</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/dashboard.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">Dashboard</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mb-3 text-center">
                      <img
                        style={{ width: "26px", height: "26px" }}
                        src={`${process.env.PUBLIC_URL}/assets/images/reports.jpg`}
                        alt="eRaktkosh"
                        className="img-fluid"
                      />
                      <p className="mb-0 text_section">Statutory Reports</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="details_section p-3 mt-4 pb-0 pe-0">
              <h3 className="header-page mb-2">
                e-Raktkosh has six major components for management of the blood
                donation life cycle
              </h3>
              <div className="d-flex" style={{ position: "relative" }}>
                <ul className="text_section mb-0" style={{ padding: "1rem" }}>
                  <li className="text_section mb-2">
                    The biometric Donor Management System for identifying,
                    tracking and blocking donors based on donor's health,
                    donation history etc.
                  </li>
                  <li className="text_section mb-2">
                    It provides features such as blood grouping, TTI screening,
                    antibody screening, component preparation etc. as per the
                    defined processes and rules.
                  </li>
                  <li className="text_section mb-2">
                    A Centralized Blood inventory Management System for keeping
                    track of the blood stock across numerous blood centers.
                  </li>
                  <li className="text_section mb-2">
                    Bio-Medical Waste Management System for disposal of
                    discarded blood and other waste generated during this
                    process.
                  </li>
                  <li className="text_section mb-2">
                    Generation od rare blood group donor registries and the
                    generation of regular repeat donors.
                  </li>
                  <li className="text_section">
                    Alert and Notification System.
                  </li>
                </ul>

                <div style={{ position: "absolute", right: "0", bottom: "0" }}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/about_eraktkosh.svg`}
                    alt=""
                    style={{ height: "245px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutEraktkosh;
