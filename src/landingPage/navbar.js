import React from "react";
import { Link } from 'react-router-dom';
export default function Navbar() {

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/beta#">
              <img
                src="assets/images/main-icon1.png"
                className="img-fluid"
                alt="Home"
                style={{ cursor: 'pointer' }}
              />
            </Link>

            <input type="checkbox" id="menu-bar" />
            <label htmlFor="menu-bar">Menu</label>

            <nav className="navbar py-0">
              <ul className="mb-0 ps-0">
                <li className="activ">
                  <a className="dropMenu" href="javascript:void(0)">
                    HOME
                    <img
                      className="ms-2 dropdown-icon"
                      src="assets/images/drop-down.png"
                      width="12px"
                      height="7.4px"
                      alt="" />
                  </a>
                  <ul className="ps-0">
                    <li>
                      {/* <a href="/BLDAHIMS/bloodbank/transactions/bbpublicindex.html">
                        Home Beta
                      </a> */}
                      <Link className="links" to="/beta#">Home</Link>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/about.cnt">
                        About eRaktkosh
                      </a>
                      {/* <Link className="links" to="/publicPages/AboutEraktkosh"> About eRaktkosh</Link> */}
                    </li>
                    <li>
                      <a className="links" href="https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/">
                        e-Raktkosh Dashboard
                      </a>
                    </li>
                    <li>
                      <a className="links" href="/BLDAHIMS/bloodbank/notification.cnt">
                        Notifications
                      </a>
                      {/* <Link className="links" to="/publicPages/Notification">Notifications</Link> */}
                    </li>
                    <li>
                      <a className="links" href="/BLDAHIMS/bloodbank/eraktkoshfaq.cnt">
                        eRaktkosh FAQ's
                      </a>
                      {/* <Link className="links" to="/publicPages/FAQs">eRaktkosh FAQ's</Link> */}
                    </li>
                    <li>
                      {/* <a href="/BLDAHIMS/bloodbank/transactions/bbpublicindexGallery.html">
                        Gallery
                      </a> */}
                      <Link className="links" to="/publicPages/gallery">Gallery</Link>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/transactions/video.html">
                        Video Gallery
                      </a>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/contact.cnt">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/downloadMobile.cnt">
                        Mobile Apps
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    LOOKING FOR BLOOD
                    <img
                      className="ms-2 dropdown-icon"
                      src="assets/images/drop-down.png"
                      width="12px"
                      height="7.4px"
                      alt="" />
                  </a>

                  <ul className="ps-0">
                    <li>
                      {/* <Link className="links" to="/publicPages/bloodAvailabilitySearch">Blood Availability</Link> */}
                      <a href="/BLDAHIMS/bloodbank/stockAvailability.cnt">
                        Blood Availability
                      </a>
                    </li>
                    <li>
                      {/* <Link className="links" to="/publicPages/bloodBankDirectory">Blood Center Directory</Link> */}

                      <a href="/BLDAHIMS/bloodbank/nearbyBBRed.cnt">
                        Blood Center Directory
                      </a>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/portalThalassemiaLogin.cnt">
                        Thalassemia Request
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    WANT TO DONATE BLOOD
                    <img
                      className="ms-2 dropdown-icon"
                      src="assets/images/drop-down.png"
                      width="12px"
                      height="7.4px"
                      alt="" />
                  </a>
                  <ul className="ps-0">
                    {/* <li>
                      <Link className="links" to="/pages/donationPledge">Donor Pledge</Link>
                      
                    </li> */}
                    <li>
                      {/* <Link className="links" to="/publicPages/campSchedule"> Blood Donation Camps</Link> */}
                      <a href="/BLDAHIMS/bloodbank/campSchedule.cnt">
                        Blood Donation Camps
                      </a>
                    </li>
                    <li>
                      {/* <Link className="links" to="/pages/portalDonorLogin"> Donor Login</Link> */}
                      <a href="/BLDAHIMS/bloodbank/portalDonorLogin.cnt">
                        Donor Login
                      </a>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/donateblood.cnt">
                        About Blood Donation
                      </a>
                    </li>
                    <li>
                      {/* <Link className="links" to="/publicPages/campRegistration">Register VBD Camp</Link> */}
                      <a href="/BLDAHIMS/bloodbank/onlineCampRequestNewBB.cnt">
                        Register VBD Camp
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    BLOOD CENTER LOGIN
                    <img
                      className="ms-2 dropdown-icon"
                      src="assets/images/drop-down.png"
                      width="12px"
                      height="7.4px"
                      alt="" />
                  </a>
                  <ul className="ps-0">
                    <li>
                      <a className="links" href="/eRaktKosh/hissso/loginLogin">
                        eRaktkosh Login
                      </a>
                    </li>
                    <li>
                      <a className="links" href="/BLDAHIMS/bloodbank/bbOnboard.cnt?hmode=GETONBOARDFORMESSENTIAL">
                        Add Your Blood Center
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item d-flex d-xl-none d-lg-none">
                  <a
                    className="nav-link"
                    href="https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/" > E-RAKTKOSH DASHBOARD
                  </a>
                </li>
                <div className="d-xl-flex d-lg-flex d-none">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/" > E-RAKTKOSH DASHBOARD
                    </a>
                  </li>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
