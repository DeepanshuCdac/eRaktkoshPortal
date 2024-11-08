import React from "react";
export default function Navbar() {

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <a href="javascript:void(0)">
              <img
                src="assets/images/main-icon1.png"
                className="img-fluid"
                alt=""
              />
            </a>

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
                      alt=""
                    />
                  </a>
                  <ul className="ps-0">
                    <li>
                      <a href="/BLDAHIMS/bloodbank/transactions/bbpublicindex.html">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/about.cnt">
                        About eRaktkosh
                      </a>
                    </li>
                    <li>
                      <a className="links" href="https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/">
                        e-Raktkosh Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/notification.cnt">
                        Notifications
                      </a>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/eraktkoshfaq.cnt">
                        eRaktkosh FAQs
                      </a>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/transactions/bbpublicindexGallery.html">
                        Gallery
                      </a>
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
                      alt=""
                    />
                  </a>

                  <ul className="ps-0">
                    <li>
                      <a href="/BLDAHIMS/bloodbank/stockAvailability.cnt">
                        Blood Availability
                      </a>
                    </li>
                    <li>
                      <a href="/BLDAHIMS/bloodbank/nearbyBBRed.cnt">
                        Blood Bank Directory
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
                      alt=""
                    />
                  </a>
                  <ul className="ps-0">
                    <li>
                      <a href="/BLDAHIMS/bloodbank/campSchedule.cnt">
                        Blood Donation Camps
                      </a>
                    </li>
                    <li>
                      {/* <Link className="links" to="/donorLogin"> Donor Login</Link> */}
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
                      <a href="/BLDAHIMS/bloodbank/onlineCampRequestNewBB.cnt">
                        Register VBD Camp
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    BLOOD BANK LOGIN
                    <img
                      className="ms-2 dropdown-icon"
                      src="assets/images/drop-down.png"
                      width="12px"
                      height="7.4px"
                      alt=""
                    />
                  </a>
                  <ul className="ps-0">
                    <li>
                      {/* <Link className="links" to="/login"> eRaktkosh Login</Link> */}
                      <a className="links" href="/eRaktKosh/hissso/loginLogin">
                        eRaktkosh Login
                      </a>
                    </li>
                    <li>
                      <a className="links" href="/BLDAHIMS/bloodbank/bbOnboard.cnt?hmode=GETONBOARDFORMESSENTIAL">
                        Add Your Blood Bank
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item d-flex d-xl-none d-lg-none">
                  <a
                    className="nav-link"
                    href="https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/"
                  >
                    e-Raktkosh Dashboard
                  </a>
                </li>
                <div className="d-xl-flex d-lg-flex d-none">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/"
                    >
                      e-Raktkosh Dashboard
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
