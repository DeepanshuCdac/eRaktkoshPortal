import React, { useState } from "react";
import "../scss/landingPage.scss";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [showInput, setShowInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openDashboard = () => {
    window.open(
      "https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/",
      "_blank"
    );
  };

  const handleIconClick = () => {
    setShowInput(true);
  };

  const handleBlur = () => {
    setShowInput(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <main>
        <header>
          {/* <section className="top_header p-1">
            <div className="container">
              <div className="d-flex align-items-center">
                <CallSharpIcon style={{ height: "14px" }} />
                <div className="d-flex">
                  <p className="mb-0 tollFree">
                    <span className="d-none d-lg-inline d-xl-inline">
                      Toll Free Number:
                    </span>{" "}
                    +91-9650816031
                  </p>
                </div>
              </div>
            </div>
          </section> */}

          <section className="mid_header p-2">
            <div className="container">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex ">
                  <a href="https://mohfw.gov.in/">
                    <img
                      className="ministry_image"
                      src="assets/landingPage/health&family.svg"
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </a>
                  <div className="divider"></div>
                  <a href="/beta#">
                    <img
                      className="eraktkosh_image"
                      src="assets/landingPage/eraktkosh.svg"
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </a>
                </div>
                <div className="d-flex">
                  <Button
                    onClick={openDashboard}
                    className="d-none d-xl-block d-lg-block"
                  >
                    e-Raktkosh Dashboard
                  </Button>
                  <div className="d-none d-xl-block d-lg-block">
                    <Input
                      className="ms-3"
                      placeholder="Search"
                      prefix={<SearchOutlined />}
                    />
                  </div>
                  <div className="d-block d-xl-none d-lg-none">
                    {!showInput ? (
                      <div className="d-flex">
                        <SearchOutlined
                          className="me-4"
                          onClick={handleIconClick}
                        />
                        <div
                          onClick={toggleMenu}
                          className="nav__toggle"
                          id="nav__toggle"
                        >
                          {isMenuOpen ? (
                            <CloseIcon className="nav__close" />
                          ) : (
                            <MenuIcon className="nav__burger" />
                          )}
                        </div>
                      </div>
                    ) : (
                      <Input
                        autoFocus
                        className="ms-2 w-48 transition-all duration-30"
                        placeholder="Search"
                        onBlur={handleBlur}
                        prefix={<SearchOutlined />}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="last_header">
            <nav className="nav container">
              <div
                className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}
                id="nav__menu"
              >
                <ul className="nav__list">
                  <li className="nav__list__li">
                    <a href="/beta#" className="nav__link">
                      Home
                    </a>
                  </li>

                  <div className="divider"></div>

                  <li className="dropdown__item">
                    <div className="nav__link">
                      About e-Raktkosh{" "}
                      <KeyboardArrowDownIcon className="dropdown__arrow" />
                    </div>

                    <ul className="dropdown__menu">
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/about.cnt"
                          className="dropdown__link"
                        >
                          About e-Raktkosh
                        </a>
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/transactions/bbpublicindexGallery.html"
                          className="dropdown__link"
                        >
                          Gallery
                        </a>
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/transactions/video.html"
                          className="dropdown__link"
                        >
                          Video Gallery
                        </a>
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/notification.cnt"
                          className="dropdown__link"
                        >
                          Notifications
                        </a>
                        {/* <Link
                          className="dropdown__link"
                          to="/publicPages/Notification"
                        >
                          Notifications
                        </Link> */}
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/eraktkoshfaq.cnt"
                          className="dropdown__link"
                        >
                          e-Raktkosh Faq's
                        </a>
                        {/* <Link className="dropdown__link" to="/publicPages/FAQs">
                          eRaktkosh FAQ's
                        </Link> */}
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/contact.cnt"
                          className="dropdown__link"
                        >
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </li>


                  <div className="divider"></div>

                  {/* dropdown 1 */}
                  <li className="dropdown__item">
                    <div className="nav__link">
                      Looking for Blood{" "}
                      <KeyboardArrowDownIcon className="dropdown__arrow" />
                    </div>

                    <ul className="dropdown__menu">
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/portalDonorLogin.cnt"
                          className="dropdown__link"
                        >
                          Donor Login
                        </a>
                        {/* <Link
                          className="dropdown__link"
                          to="/pages/portalDonorLogin"
                        >
                          {" "}
                          Donor Login
                        </Link> */}
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/stockAvailability.cnt"
                          className="dropdown__link"
                        >
                          Blood Availability
                        </a>
                        {/* <Link
                          className="dropdown__link"
                          to="/publicPages/bloodAvailabilitySearch"
                        >
                          Blood Availability
                        </Link> */}
                      </li>

                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/nearbyBBRed.cnt"
                          className="dropdown__link"
                        >
                          Blood Center Directory
                        </a>
                        {/* <Link
                          className="dropdown__link"
                          to="/publicPages/bloodBankDirectory"
                        >
                          Blood Center Directory
                        </Link> */}
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/portalThalassemiaLogin.cnt"
                          className="dropdown__link"
                        >
                          Thalassemia Request
                        </a>
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/downloadMobile.cnt"
                          className="dropdown__link"
                        >
                          Mobile App
                        </a>
                      </li>

                      {/* dropdown submenu */}
                      {/* <li className="dropdown__subitem dropdown__menu__li">
                        <div className="dropdown__link">
                          Mobile Apps
                          <KeyboardArrowDownIcon className="dropdown__add" />
                        </div>

                        <ul className="dropdown__submenu">
                          <li className="dropdown__submenu__li">
                            <a href="#" className="dropdown__sublink">
                              Test
                            </a>
                          </li>

                          <li className="dropdown__submenu__li">
                            <a href="#" className="dropdown__sublink">
                              Blood Donation Test
                            </a>
                          </li>

                          <li className="dropdown__submenu__li">
                            <a href="#" className="dropdown__sublink">
                              Test
                            </a>
                          </li>
                        </ul>
                      </li> */}
                    </ul>
                  </li>

                  <div className="divider"></div>

                  {/* dropdown 2 */}
                  <li className="dropdown__item">
                    <div className="nav__link">
                      Want to Donate{" "}
                      <KeyboardArrowDownIcon className="dropdown__arrow" />
                    </div>

                    <ul className="dropdown__menu">
                      {/* <li className="dropdown__menu__li">
                        <Link
                          className="dropdown__link"
                          to="/publicPages/donationPledge"
                        >
                          {" "}
                         e-Raktkosh Donor Pledge
                        </Link>
                      </li> */}
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/donateblood.cnt"
                          className="dropdown__link"
                        >
                          About Blood Donation
                        </a>
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/campSchedule.cnt"
                          className="dropdown__link"
                        >
                          Blood Donation Camps
                        </a>
                        {/* <Link
                          className="dropdown__link"
                          to="/publicPages/campSchedule"
                        >
                          {" "}
                          Blood Donation Camps
                        </Link> */}
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/onlineCampRequestNewBB.cnt"
                          className="dropdown__link"
                        >
                          Register VBD Camp
                        </a>
                      </li>
                    </ul>
                  </li>

                  <div className="divider"></div>

                  

                  {/* <div className="divider"></div> */}

                  {/* <li className="nav__list__li">
                    <a
                      href="/BLDAHIMS/bloodbank/contact.cnt"
                      className="nav__link"
                    >
                      Contact Us
                    </a>
                  </li> */}

                  {/* <div className="divider"></div> */}

                  <li className="dropdown__item">
                    <div className="nav__link">
                      Blood Centre Login{" "}
                      <KeyboardArrowDownIcon className="dropdown__arrow" />
                    </div>

                    <ul className="dropdown__menu">
                      <li className="dropdown__menu__li">
                        <a
                          href="/eRaktKosh/hissso/loginLogin"
                          className="dropdown__link"
                        >
                          e-Raktkosh Login
                        </a>
                      </li>
                      <li className="dropdown__menu__li">
                        <a
                          href="/BLDAHIMS/bloodbank/bbOnboard.cnt?hmode=GETONBOARDFORMESSENTIAL"
                          className="dropdown__link"
                        >
                          Add Your Blood Center
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </section>
        </header>
      </main>
    </>
  );
}
