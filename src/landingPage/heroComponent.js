import { Button } from "antd";
import React, { useState, useEffect } from "react";

export default function HeroComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    // }, 10000);
    // return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    window.location.href = "/#/publicPages/bloodAvailabilitySearch";
    // window.location.href = "/BLDAHIMS/bloodbank/portalDonorLogin.cnt";
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="heroComponent page-wrapper">
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        // data-bs-ride="carousel"
      >
        <div className="carousel-indicators mb-1">
          {[0, 1, 2, 3].map((index) => (
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
          <div
            className={`carousel-item ${currentIndex === 0 ? "active" : ""}`}
          >
            <img
              src="assets/landingPage/Banner-11.jpg"
              className="d-block w-100"
              alt="Second Image"
            />
          </div>

          {/* 2nd Slide */}
          <div
            className={`carousel-item ${currentIndex === 1 ? "active" : ""}`}
          >
            <img
              src="assets/landingPage/Banner-21.jpg"
              className="d-block w-100"
              alt="Second Image"
            />
          </div>

          {/* 3rd Slide */}
          <div
            className={`carousel-item ${currentIndex === 2 ? "active" : ""}`}
          >
            <img
              src="assets/landingPage/Banner-3.jpg"
              className="d-block w-100"
              alt="Second Image"
            />
            <div
              className="carousel-caption d-md-block"
              style={{ left: "19%", bottom: "8%" }}
            >
              <div className="d-flex flex-column text-center">
                <div className="d-flex flex-column align-items-baseline">
                  <h5 className="img-text">Download Now On</h5>
                  <a href="#" className="mb-2">
                    <img src="assets/landingPage/playstore.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="assets/landingPage/appstore.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 4th Slide */}
          <div
            className={`carousel-item ${currentIndex === 3 ? "active" : ""}`}
          >
            <img
              src="assets/landingPage/Banner-4.jpg"
              className="d-block w-100"
              alt="Second Image"
            />
            <div
              className="carousel-caption d-md-block"
              style={{ left: "12%", bottom: "5%" }}
            >
              <div className="d-flex flex-column text-center">
                <div className="d-flex">
                  <Button onClick={handleClick} className="btn__outlined ">
                    Find Blood Availability
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {/* <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
          onClick={() => setCurrentIndex((currentIndex - 1 + 5) % 5)}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
          onClick={() => setCurrentIndex((currentIndex + 1) % 5)}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      </div>
    </section>
  );
}
