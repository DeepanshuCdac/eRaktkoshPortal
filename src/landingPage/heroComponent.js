import React, { useState, useEffect } from "react";

export default function HeroComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    // window.location.href = "/beta#/pages/portalDonorLogin";
    window.location.href = "/BLDAHIMS/bloodbank/portalDonorLogin.cnt";
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="heroComponent">
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {[0, 1].map((index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide-to={index}
              className={currentIndex === index ? "active" : ""}
              aria-current={currentIndex === index ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleIndicatorClick(index)}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {/* 1st Slide */}
          {/* <div className={`carousel-item ${currentIndex === 0 ? 'active' : ''}`}>
            <div className="carousel-inner-container">
              <div className="carousel-image">
                <img src="assets/images/heroImg1.png" className="d-block w-100" alt="First Image" />
              </div>
              <div className="carousel-image carousel-image-right">
                <img src="assets/gif/heroComponent1.gif" className="d-block w-100" alt="Second Image" />
              </div>
              <div className="carousel-caption d-md-block"  style={{ left: '8%', bottom: '0' }}>
                <h5 className="img-text">Donate Blood Save Lives</h5>
                <p className="img-content">Be a lifesaver today. Donate blood at the Blood Center,</p>
                <p className="img-content mb-3">where every donation is a lifeline.</p>
                <button className="btn imgBtn d-none d-lg-block d-xl-block" onClick={handleClick}>BECOME A DONOR</button>
              </div>
            </div>
          </div> */}

          {/* 2nd Slide */}
          <div
            className={`carousel-item ${currentIndex === 0 ? "active" : ""}`}
          >
            <img
              src="assets/images/header2.png"
              className="d-block w-100"
              alt="Second Image"
            />
          </div>

          {/* 3rd Slide */}
          {/* <div
            className={`carousel-item ${currentIndex === 1 ? "active" : ""}`}
          >
            <img
              src="assets/images/header3.png"
              className="d-block w-100"
              alt=""
            />
            <div
              className="carousel-caption d-md-block"
              style={{ left: "46%", bottom: "0" }}
            >
              <div className="d-flex flex-column text-center">
                <div>
                </div>
              </div>
            </div>
          </div> */}

          {/* 4th Slide */}
          <div
            className={`carousel-item ${currentIndex === 1 ? "active" : ""}`}
          >
            <img
              src="assets/images/header4.png"
              className="d-block w-100"
              alt="Fourth Image"
            />
            <div
              className="carousel-caption d-md-block mt-3"
              style={{ left: "7%", bottom: "0" }}
            >
              <button
                className="btn imgBtn d-none d-lg-block d-xl-block"
                onClick={handleClick}
              >
                BECOME A DONOR
              </button>
            </div>
          </div>
        </div>
     
      </div>
    </section>
  );
}
