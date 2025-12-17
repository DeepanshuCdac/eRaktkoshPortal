import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Footer() {
  return (
    <>
      <section className="footer__section py-4">
        <div className="container">
          <div className="section d-xl-flex">
            <div className="sub__section" style={{ flex: "1 1 12%" }}>
              <h3 className="section__header mb-3">Contact</h3>
              <div className="mb-3">
                <p className="key mb-0">Address:</p>
                <p className="value mb-0">
                  C-56/1, Anusandhan Bhawan, Sector-62, Noida, Uttar
                  Pradesh-201307
                </p>
              </div>

              <div className="mb-3">
                <p className="key mb-0">Contact Number</p>
                <p className="value mb-0">+91-9650816031</p>
              </div>

              <div className="mb-3">
                <p className="key mb-0">Email</p>
                <p className="value mb-0">eraktkosh@cdac.in</p>
              </div>

              <div className="mb-3">
                <p className="key mb-0">For Administrative queries</p>
                <p className="value mb-0">
                  Blood Cell, National Health Mission Ministry of Health &
                  Family Welfare, New Delhi-110011
                </p>
              </div>
            </div>
            <div className="sub__section" style={{ flex: 2 }}>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 ">
                  <div className="d-flex flex-column">
                    <h3 className="section__header mb-3">Important Links</h3>
                    {/* <a
                      href="/BLDAHIMS/bloodbank/stockAvailability.cnt"
                      className="value mb-2"
                    >
                      Search Blood Availability
                    </a> */}
                    <Link
                      className="value mb-2"
                      to="/publicPages/bloodAvailabilitySearch"
                    >
                      Search Blood Availability
                    </Link>
                    {/* <a href="/BLDAHIMS/bloodbank/nearbyBBRed.cnt" className="value mb-2">
                          Search Blood Center Directory
                        </a> */}
                    <Link
                      className="value mb-2"
                      to="/publicPages/bloodBankDirectory"
                    >
                      Search Blood Center Directory
                    </Link>
                    {/* <a href="/BLDAHIMS/bloodbank/campSchedule.cnt" className="value mb-2">
                          Search Blood Donation Camps
                        </a> */}
                    <Link className="value mb-2" to="/publicPages/campSchedule">
                      Search Blood Donation Camp
                    </Link>
                    {/* <Link
                    className="value mb-2"
                    to="/publicPages/campSchedule"
                  >
                    Blood Center Login
                  </Link> */}
                    <a
                      href="/eRaktKosh/hissso/loginLogin"
                      className="value mb-2"
                    >
                      Blood Center Login
                    </a>
                     {/* <a
                      href="/BLDAHIMS/bloodbank/portalDonorLogin.cnt"
                      className="value mb-2"
                    >
                      Donor Login
                    </a> */}
                    <Link className="value mb-2" to="/pages/portalDonorLogin">
                      Donor Login
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 ">
                  <div className="d-flex flex-column">
                    <h3 className="section__header mb-3">Policies</h3>
                    {/* <Link
                      className="value mb-2"
                      to="/publicPages/bloodAvailabilitySearch"
                    >
                      Terms & Conditions
                    </Link> */}
                    <a
                      className="value mb-2"
                      href="/BLDAHIMS/bloodbank/termsAndConditions.cnt"
                    >
                      Terms & Conditions
                    </a>
                    {/* <Link
                      className="value mb-2"
                      to="/publicPages/bloodAvailabilitySearch"
                    >
                      Privacy Policy
                    </Link> */}
                    <a
                      className="value mb-2"
                      href="/BLDAHIMS/bloodbank/privacyPolicy.cnt"
                    >
                      Privacy Policy
                    </a>
                    {/* <Link
                      className="value mb-2"
                      to="/publicPages/bloodAvailabilitySearch"
                    >
                      Accessibility Statement
                    </Link> */}
                    <a
                      className="value mb-2"
                      href="/BLDAHIMS/bloodbank/accessibilityStmt.cnt"
                    >
                      Accessibility Statement
                    </a>
                    {/* <Link className="value mb-2" to="/publicPages/siteMap">
                      Site Map
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="sub__section" style={{ flex: 1 }}>
              <div className="mb-3">
                <p className="key mb-0">Visitors Count</p>
                <a
                  href="http://statcounter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="statcounter"
                    src="http://c.statcounter.com/10830880/0/81667bbc/0/"
                    alt="hits counter"
                    style={{ padding: 0 }}
                  />
                </a>
              </div>
              <div className="mb-3">
                <p className="key mb-0">Social Media</p>
                <div>
                  <a href="#">
                    <img
                      style={{ height: "25px" }}
                      className="me-2"
                      src="assets/landingPage/twitter.png"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      style={{ height: "25px" }}
                      className="me-2"
                      src="assets/landingPage/insta.png"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      style={{ height: "25px" }}
                      className="me-2"
                      src="assets/landingPage/youtube.png"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      style={{ height: "25px" }}
                      className="me-2"
                      src="assets/landingPage/facebook.png"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="black__footer__section py-1">
        <p className="mb-0 text-center">
          Designed and Developed by Centre for Development of Advanced Computing
        </p>
      </section>
    </>
  );
}
