import React, { useState, useRef } from "react";

export default function Link() {
  const [showCode, setShowCode] = useState(false);
  const wrapperRef = useRef(null);

  return (
    <section className="link__section">
      <div
        ref={wrapperRef}
        onMouseEnter={() => setShowCode(true)}
        onMouseLeave={() => setShowCode(false)}
      >
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
            <a href="javascript:void(0)" className="mobile__link">
              <img src="assets/landingPage/download.png" alt="" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
