import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Footer() {

  const handleImageClick1 = () => {
    window.location.href = 'http://mohfw.nic.in/';
  };
  const handleImageClick2 = () => {
    window.location.href = 'https://web.umang.gov.in/landing/';
  };
  const handleImageClick3 = () => {
    window.location.href = 'https://www.nhp.gov.in/';
  };
  const handleImageClick4 = () => {
    window.location.href = 'https://india.gov.in/';
  };
  const handleImageClick5 = () => {
    window.location.href = 'https://cdac.in/';
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
                  className="footer-details mb-2"
                >
                  Blood Availability
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/nearbyBBRed.cnt"
                  className="footer-details mb-2"
                >
                  Blood Bank Directory
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/portalThalassemiaLogin.cnt"
                  className="footer-details mb-2"
                >
                  Thalessemia Request
                </a>
              </div>
            </div>
            <div className="col-12 col-md-4 col-xl-3 mb-3">
              <h5 className="heading mb-0">Web Information Manager</h5>
              <h5 className="heading">Senior Director</h5>    
              <div className="d-flex flex-column">
                <a
                  href="/BLDAHIMS/bloodbank/campSchedule.cnt"
                  className="footer-details mb-2"
                >
                  Blood Donation Camp
                </a>
                {/* <Link className="footer-details mb-2" to="/donorLogin"> Donor Login</Link> */}
                <a
                  href="/BLDAHIMS/bloodbank/portalDonorLogin.cnt"
                  className="footer-details mb-2"
                >
                  Donor Login
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/donateblood.cnt"
                  className="footer-details mb-2"
                >
                  About Blood Donation
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/onlineCampRequestNewBB.cnt"
                  className="footer-details mb-2"
                >
                  Register VBD Camp
                </a>
              </div>
            </div>
            <div className="col-12 col-md-4 col-xl-2 mb-3">
              <h5 className="heading">Blood Bank Login</h5>
              <div className="d-flex flex-column">
                <a
                  href="/eRaktKosh/hissso/loginLogin"
                  className="footer-details mb-2"
                >
                  e-Raktkosh Login
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/bbOnboard.cnt?hmode=GETONBOARDFORMESSENTIAL"
                  className="footer-details mb-2"
                >
                  Add your Blood Bank
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-2 mb-3">
              <h5 className="heading">About Us</h5>
              <div className="d-flex flex-column">
                <a
                  href="/BLDAHIMS/bloodbank/about.cnt"
                  className="footer-details mb-2"
                >
                  About e-Raktkosh
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/notification.cnt"
                  className="footer-details mb-2"
                >
                  Notifications
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/eraktkoshfaq.cnt"
                  className="footer-details mb-2"
                >
                  e-Raktkosh FAQs
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/transactions/bbpublicindexGallery.html"
                  className="footer-details mb-2"
                >
                  Gallery{" "}
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/transactions/video.html"
                  className="footer-details mb-2"
                >
                  Video Gallery
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/contact.cnt"
                  className="footer-details mb-2"
                >
                  Contact Us
                </a>
                <a
                  href="/BLDAHIMS/bloodbank/downloadMobile.cnt"
                  className="footer-details mb-2"
                >
                  Mobile Apps
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-2 mb-3">
              <h5 className="heading">Download e-raktkosh App</h5>
              <img className="mb-0 mb-xl-1 me-2 me-xl-0" src="assets/images/apple-store.png" />
              <img className="" src="assets/images/google-store.png" />
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12 col-md-4 col-xl-2 mb-3">
              <img
                className=""
                width="67px"
                height="67px"
                src="assets/images/main-icon.png"
                
              />
            </div>
            <div className="col-12 col-md-4 col-xl-3 mb-3 d-xl-flex justify-content-center">
              <img className="" src="assets/images/ministry-icon.png" onClick={handleImageClick1}/>
            </div>
            <div className="col-12 col-md-4 col-xl-2 mb-3 d-xl-flex justify-content-center">
              <img className="" src="assets/images/umang-icon.png" onClick={handleImageClick2}/>
            </div>
            <div className="col-12 col-md-4 col-xl-3 mb-3 d-xl-flex justify-content-center">
              <img className="" src="assets/images/nhp-icon.png" onClick={handleImageClick3}/>
            </div>
            <div className="col-12 col-md-4 col-xl-2 mb-3 d-xl-flex justify-content-center">
              <img className="" src="assets/images/govt-icon.png" onClick={handleImageClick4}/>
            </div>
          </div>

          <div className="text-center mb-1">
            <a className="footer-links" href="/BLDAHIMS/bloodbank/termsAndConditions.cnt">
              Terms & Conditions
            </a>
            |
            <a className="footer-links" href="/BLDAHIMS/bloodbank/privacyPolicy.cnt">
              Privacy Policy
            </a>
            |
            <a className="footer-links" href="/BLDAHIMS/bloodbank/accessibilityStmt.cnt">
              Accessibility Statement
            </a>
            |
            <a className="footer-links" href="javascript:void(0)">
              Last Updated: 12 March 2024
            </a>
            |
            <a className="footer-links" href="/BLDAHIMS/bloodbank/eraktkoshSiteMap.cnt">
              Site Map
            </a>
            |
            <a className="footer-links" href="javascript:void(0)" onClick={handleImageClick1}>
              2016-2024 by Ministry of Health and Family we5
            </a>
          </div>
          <p className="text-center footer-links" onClick={handleImageClick5}>
            Designed and Developed by Centre for Development of Advanced
            Computing
          </p>
        </div>
      </section>
    </>
  );
}
