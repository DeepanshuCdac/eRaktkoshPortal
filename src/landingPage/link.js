import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

export default function Link() {
  const [showCode, setShowCode] = useState(false);
  const wrapperRef = useRef(null);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const link =
      "https://play.google.com/store/apps/details?id=in.cdac.mhealth.m_raktkosh";
    QRCode.toDataURL(link)
      .then((url) => setQrUrl(url))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="link__section">
      <div
        ref={wrapperRef}
        onMouseEnter={() => setShowCode(true)}
        onMouseLeave={() => setShowCode(false)}
      >
        {showCode ? (
          <div className="p-3 link__tags__scanner d-flex flex-column align-items-center gap-2">
            {/* <img className="mb-1" src={`${process.env.PUBLIC_URL}/assets/landingPage/QR.png`} alt="" /> */}
            {qrUrl && <img src={qrUrl} alt="App QR" width={100} />}
            <a href="https://play.google.com/store/apps/details?id=in.cdac.mhealth.m_raktkosh">
              <img
                className="mb-0"
                src={`${process.env.PUBLIC_URL}/assets/landingPage/playstore.png`}
                alt=""
              />
            </a>
            <a href="https://apps.apple.com/in/app/eraktkosh/id1108324530">
              <img
                className="mb-0"
                src={`${process.env.PUBLIC_URL}/assets/landingPage/appstore.png`}
                alt=""
              />
            </a>
          </div>
        ) : (
          <div className="link__tags d-flex align-items-center flex-column">
            <a href="javascript:void(0)" className="mobile__link">
              <img
                src={`${process.env.PUBLIC_URL}/assets/landingPage/download.png`}
                alt=""
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
