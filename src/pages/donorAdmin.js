import React, { useState, useEffect } from "react";
import DonorAdminHome from "../components/donorAdminHome";
import DonorAdminProfile from "../components/donorAdminProfile";
import { useDonor } from "../context/DonorContext";
import { useCertificate } from "../context/CertificateContext";
import DonationCertificate from "../components/donationCertificate";
import BloodAvailabiltySearch from "../publicPages/bloodAvailabilitySearch";
import CampSchedule from "../publicPages/CampSchedule";
import "../scss/donorAdmin.scss";

export default function DonorAdmin() {
  const { certificateDataLength, fetchCertificateData } = useCertificate();
  const { donorData, loading, error, fetchDonorData } = useDonor();
  const [activeTab, setActiveTab] = useState(0);
  const [activeLink, setActiveLink] = useState("Home");

  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (e) {
      console.error("Invalid token format:", e);
      return false;
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!isTokenValid(token)) {
      sessionStorage.clear();
      alert("Session expired. Please log in again.");
      window.location.href = "/beta#/pages/portalDonorLogin";
    } else {
      fetchDonorData();
      fetchCertificateData();
    }
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    localStorage.setItem("ActiveTab", index);
  };

  const setDonationCertificateTab = () => {
    setActiveLink("Donation Certificate");
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("ActiveTab");
    if (savedTab !== null) {
      setActiveTab(parseInt(savedTab, 10));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setActiveTab(0);
    localStorage.removeItem("ActiveTab");
    window.location.href = "/beta#/pages/portalDonorLogin";
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <a href="javascript:void(0)">
              <img
                src="assets/images/main-icon1.png"
                className="img-fluid"
                alt="mainIcon"
              />
            </a>
            <a
              onClick={handleLogout}
              href="javascript:void(0)"
              className="mb-0 logout"
            >
              Logout
            </a>
          </div>
        </div>
      </header>
      <section className="donorAdmin mt-2">
        <div className="container">
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && donorData && (
            <div>
              <nav className="navbar navbar-expand-lg p-0">
                <div className="container-fluid p-0">
                  <div className="header-section mb-3">
                    <div className="d-xl-flex d-lg-flex d-md-flex align-items-center me-auto">
                        {donorData.body.gender === "M" ? 
                      <img
                        style={{ width: "45px", height: "45px" }}
                        className="img-fluid"
                        src="assets/images/male.png"
                        alt="user-img"
                      />
                      :
                      <img
                        style={{ width: "45px", height: "45px" }}
                        className="img-fluid"
                        src="assets/images/female.png"
                        alt="user-img"
                      />
                        }
                      <div className="ms-2">
                        <div className="">
                          <p className="mb-0 greet">
                            Welcome{" "}
                            <span className="greetName mb-0">
                              {donorData.body?.edonorFName || "Donor"}!
                            </span>
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-end mb-1">
                          <p className="mb-0 me-2 key">Last Login:</p>
                          <span className="mb-0 key">
                            {donorData.body?.isLastLogin || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    style={{ flexGrow: "initial" }}
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeLink === "Home" ? "custom-active" : ""
                          }`}
                          onClick={() => setActiveLink("Home")}
                          aria-current="page"
                          href="javascript:void(0)"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeLink === "Manage Profile"
                              ? "custom-active"
                              : ""
                          }`}
                          onClick={() => setActiveLink("Manage Profile")}
                          aria-current="page"
                          href="javascript:void(0)"
                        >
                          Manage Profile
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeLink === "Donation Certificate"
                              ? "custom-active"
                              : ""
                          }`}
                          onClick={() => setActiveLink("Donation Certificate")}
                          aria-current="page"
                          href="javascript:void(0)"
                        >
                          Donation Certificate
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeLink === "Looking for Blood"
                              ? "custom-active"
                              : ""
                          }`}
                          onClick={() => setActiveLink("Looking for Blood")}
                          aria-current="page"
                          href="/beta#/publicPages/bloodAvailabilitySearch"
                        >
                          Looking for Blood
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeLink === "Want to Donate"
                              ? "custom-active"
                              : ""
                          }`}
                          onClick={() => setActiveLink("Want to Donate")}
                          aria-current="page"
                          href="/beta#/publicPages/campSchedule"
                        >
                          Want to Donate
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

              {activeLink === "Home" && (
                <div className="row">
                  <div className="col-xl-3">
                    <div className="widget p-3 mb-3">
                      <div>
                        <p className="mb-0 number">
                          {certificateDataLength || "N/A"}
                        </p>
                        <p className="mb-0 text">Rakt Score</p>
                      </div>
                      <img src="assets/images/menu_icon.svg" alt="" />
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="widget p-3 mb-3">
                      <div className="">
                        <p className="mb-0 number">
                          {donorData.body?.bloodGroupName || "N/A"}
                        </p>
                        <p className="mb-0 text">Blood Group</p>
                      </div>
                      <img src="assets/images/menu_icon.svg" alt="" />
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="widget p-3 mb-3">
                      <div className="">
                        <p className="mb-0 number">
                          {certificateDataLength || "N/A"}
                        </p>
                        <p className="mb-0 text">Total Donations</p>
                      </div>
                      <img src="assets/images/menu_icon.svg" alt="" />
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="widget p-3 mb-3">
                      <div className="">
                        <p className="mb-0 number">
                          {donorData.body?.totalIssue || 0}
                        </p>
                        <p className="mb-0 text">Total Issues</p>
                      </div>
                      <img src="assets/images/menu_icon.svg" alt="" />
                    </div>
                  </div>
                </div>
              )}
              <div className="">
                {activeLink === "Home" && (
                  <DonorAdminHome onViewAllClick={setDonationCertificateTab} />
                )}
                {activeLink === "Manage Profile" && <DonorAdminProfile />}
                {activeLink === "Donation Certificate" && (
                  <DonationCertificate onBack={() => setActiveLink("Home")} />
                )}
                {/* {activeLink === "Looking for Blood" && (
                  <BloodAvailabiltySearch />
                )}
                {activeLink === "Want to Donate" && <CampSchedule />} */}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
