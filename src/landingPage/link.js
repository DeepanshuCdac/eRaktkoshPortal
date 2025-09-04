import React, { useState, useEffect, useRef } from "react";

export default function Link() {
  const [showCode, setShowCode] = useState(false);
  const wrapperRef = useRef(null);

  const handleShow = () => {
    setShowCode(true);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowCode(false);
    }
  };

  useEffect(() => {
    if (showCode) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCode]);

  return (
    <section className="link__section">
      <div ref={wrapperRef}>
        {showCode ? (
          <div className="p-3 link__tags__scanner d-flex flex-column">
            <img className="mb-1" src="assets/landingPage/QR.png" alt="" />
            <a href="https://play.google.com/store/apps/details?id=in.cdac.mhealth.m_raktkosh">
              <img
                className="mb-1"
                src="assets/landingPage/playstore.png"
                alt=""
              />
            </a>
            <a href="https://apps.apple.com/in/app/eraktkosh/id1108324530">
              <img
                className="mb-1"
                src="assets/landingPage/appstore.png"
                alt=""
              />
            </a>
          </div>
        ) : (
          <div className="link__tags d-flex align-items-center flex-column">
            {/* <a href="#" className="whatsapp__link my-2">
              <img src="assets/landingPage/Whatsapp.png" alt="" />
            </a> */}
            <a
              href="javascript:void(0)"
              onClick={handleShow}
              className="mobile__link"
            >
              <img src="assets/landingPage/download.png" alt="" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
