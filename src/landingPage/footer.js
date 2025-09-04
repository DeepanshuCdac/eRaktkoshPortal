import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const handleImageClick1 = () => {
    window.location.href = "https://mohfw.gov.in/";
  };
  const handleImageClick2 = () => {
    window.location.href = "https://web.umang.gov.in/landing/";
  };
  const handleImageClick3 = () => {
    window.location.href = "https://nhm.gov.in/";
  };
  const handleImageClick4 = () => {
    window.location.href = "https://www.india.gov.in/";
  };
  const handleImageClick5 = () => {
    window.location.href = "https://www.cdac.in/";
  };
  const handleImageClick6 = () => {
    window.location.href = "https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/";
  };
  return (
    <>
      <section className="footer pt-4">
        <div className="container">
          <div className="row row-border">
            <div className="col-12 col-md-4 col-xl-3 mb-3">
              <h5 className="heading">Looking for Blood</h5>
              <div className="d-flex flex-column">
                <a
                  href="/BLDAHIMS/bloodbank/stockAvailability.cnt"
                  className="footer-details mb-2">
                  Blood Availability
                </a>
                {/* <Link className="footer-details mb-2" to="/publicPages/bloodAvailabilitySearch">Blood Availability</Link> */}
                <a
                  href="/BLDAHIMS/bloodbank/nearbyBBRed.cnt"
                  className="footer-details mb-2">
                  Blood Center Directory
                </a>
                {/* <Link className="footer-details mb-2" to="/publicPages/bloodBankDirectory">Blood Center Directory</Link> */}
                <a
                  href="/BLDAHIMS/bloodbank/portalThalassemiaLogin.cnt"
                  className="footer-details mb-2">
                  Thalessemia Request
                </a>
              </div>
            </div>
            <div className="col-12 col-md-4 col-xl-3 mb-3">
              <h5 className="heading mb-0">Want to Donate Blood</h5>
              <h5 className="heading"></h5>
              <div className="d-flex flex-column">
                <a
                  href="/BLDAHIMS/bloodbank/campSchedule.cnt"
                  className="footer-details mb-2">
                  Blood Donation Camp
                </a>
                {/* <Link className="footer-details mb-2" to="/publicPages/campSchedule">Blood Donation Camp</Link> */}
                <a
                  href="/BLDAHIMS/bloodbank/portalDonorLogin.cnt"
                  className="footer-details mb-2">
                  Donor Login
                </a>
                {/* <Link className="footer-details mb-2" to="/pages/portalDonorLogin"> Donor Login</Link> */}
                <a
                  href="/BLDAHIMS/bloodbank/donateblood.cnt"
                  className="footer-details mb-2">
                  About Blood Donation
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/onlineCampRequestNewBB.cnt"
                  className="footer-details mb-2">
                  Register VBD Camp
                </a>
              </div>
            </div>
            <div className="col-12 col-md-4 col-xl-2 mb-3">
              <h5 className="heading">Blood Center Login</h5>
              <div className="d-flex flex-column">
                <a
                  href="/eRaktKosh/hissso/loginLogin"
                  className="footer-details mb-2">
                  e-Raktkosh Login
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/bbOnboard.cnt?hmode=GETONBOARDFORMESSENTIAL"
                  className="footer-details mb-2" >
                  Add your Blood Center
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-2 mb-3">
              <h5 className="heading">About Us</h5>
              <div className="d-flex flex-column">
                <a
                  href="/BLDAHIMS/bloodbank/about.cnt"
                  className="footer-details mb-2">
                  About e-Raktkosh
                </a>
                {/* <Link className="footer-details mb-2" to="/publicPages/AboutEraktkosh"> About e-Raktkosh</Link> */}
                <a
                  href="/BLDAHIMS/bloodbank/notification.cnt"
                  className="footer-details mb-2">
                  Notifications
                </a>
                {/* <Link className="footer-details mb-2" to="/publicPages/Notification">Notifications</Link> */}
                <a
                  href="/publicPages/FAQs"
                  className="footer-details mb-2">
                  e-Raktkosh FAQs
                </a>
                {/* <Link className="footer-details mb-2" to="/publicPages/FAQs">e-Raktkosh FAQs</Link> */}
                <a
                  href="/BLDAHIMS/bloodbank/transactions/bbpublicindexGallery.html"
                  className="footer-details mb-2">
                  Gallery{" "}
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/transactions/video.html"
                  className="footer-details mb-2">
                  Video Gallery
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/contact.cnt"
                  className="footer-details mb-2" >
                  Contact Us
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/downloadMobile.cnt"
                  className="footer-details mb-2">
                  Mobile Apps
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-2 mb-3">
              <h5 className="heading">Download e-raktkosh App</h5>
              <img className="mb-0 mb-xl-1 me-2 me-xl-0" src="assets/images/apple-store.png" alt="...Symbols" />
              <img className="" src="assets/images/google-store.png" alt="...Symbols" />
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12 col-md-4 col-xl-2 mb-3">
              <img
                onClick={handleImageClick6}
                style={{ cursor: "pointer" }}
                className=""
                width="67px"
                height="67px"
                src="assets/images/main-icon.png"
                alt="...Symbols"
              />
            </div>
            <div className="col-12 col-md-4 col-xl-3 mb-3 d-xl-flex justify-content-center">
              <img
                className=""
                src="assets/images/ministry-icon.png"
                style={{ cursor: "pointer" }}
                onClick={handleImageClick1}
                alt="...Symbols"
              />
            </div>
            <div className="col-12 col-md-4 col-xl-2 mb-3 d-xl-flex justify-content-center">
              <img
                className=""
                src="assets/images/umang-icon.png"
                style={{ cursor: "pointer" }}
                onClick={handleImageClick2}
                alt="...Symbols"
              />
            </div>
            <div className="col-12 col-md-4 col-xl-3 mb-3 d-xl-flex justify-content-center">
              <img
                className=""
                src="assets/images/nhp-icon.png"
                style={{ cursor: "pointer" }}
                onClick={handleImageClick3}
                alt="...Symbols"
              />
            </div>
            <div className="col-12 col-md-4 col-xl-2 mb-3 d-xl-flex justify-content-center">
              <img
                className=""
                src="assets/images/govt-icon.png"
                style={{ cursor: "pointer" }}
                onClick={handleImageClick4}
                alt="...Symbols"
              />
            </div>
          </div>

          <div className="text-center mb-1">
            <a
              className="footer-links"
              href="/BLDAHIMS/bloodbank/termsAndConditions.cnt"
            >
              Terms & Conditions
            </a>
            |
            <a
              className="footer-links"
              href="/BLDAHIMS/bloodbank/privacyPolicy.cnt"
            >
              Privacy Policy
            </a>
            |
            <a
              className="footer-links"
              href="/BLDAHIMS/bloodbank/accessibilityStmt.cnt"
            >
              Accessibility Statement
            </a>
            |
            <a className="footer-links" href="javascript:void(0)">
              Last Updated: 05 Sept 2025
            </a>
            |
            <a
              className="footer-links"
              href="/BLDAHIMS/bloodbank/eraktkoshSiteMap.cnt"
            >
              Site Map
            </a>
            |
            <a
              className="footer-links"
              href="javascript:void(0)"
              onClick={handleImageClick1}
            >
              2016-2025 by Ministry of Health and Family Welfare
            </a>
          </div>
          <p
            className="text-center footer-links mb-0 pb-2"
            onClick={handleImageClick5}
          >
            Designed and Developed by Centre for Development of Advanced
            Computing
          </p>
        </div>
      </section>
    </>
  );
}
