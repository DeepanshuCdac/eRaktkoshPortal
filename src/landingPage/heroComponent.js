import React, { useState, useEffect } from 'react';

export default function HeroComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % 4); // Change to next slide every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  const handleClick = () => {
    window.location.href = "/beta#/publicPages/bloodAvailabilitySearch";
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="heroComponent">
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide-to={index}
              className={currentIndex === index ? 'active' : ''}
              aria-current={currentIndex === index ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleIndicatorClick(index)}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">

          {/* 2nd Slide */}
          <div className={`carousel-item ${currentIndex === 0 ? 'active' : ''}`}>
            <img src="assets/images/header2.png" className="d-block w-100" alt="Second Image" />
          </div>

          {/* 3rd Slide */}
          <div className={`carousel-item ${currentIndex === 1 ? 'active' : ''}`}>
            <img src="assets/images/header3.png" className="d-block w-100" alt="" />
            <div className="carousel-caption d-md-block" style={{ left: '46%', bottom: '0' }}>
              <div className="d-flex flex-column text-center">
                <div>
                  <button className="btn imgBtn d-none d-lg-block d-xl-block" onClick={handleClick}>BECOME A DONOR</button>
                </div>
              </div>
            </div>
          </div>

          {/* 4th Slide */}
          <div className={`carousel-item ${currentIndex === 2 ? 'active' : ''}`}>
            <img src="assets/images/header4.png" className="d-block w-100" alt="Fourth Image" />
            <div className="carousel-caption d-md-block mt-3" style={{ left: '7%', bottom: '0' }}>
              <button className="btn imgBtn d-none d-lg-block d-xl-block" onClick={handleClick}>SEARCH BLOOD</button>
            </div>
          </div>

          {/* 5th Slide */}
          <div className={`carousel-item ${currentIndex === 3 ? 'active' : ''}`}>
            <img src="assets/images/header5.png" className="d-block w-100" alt="Fifth Image" />
            <div className="carousel-caption d-md-block" style={{ left: '8%', bottom: '0' }}>
              <button className="btn imgBtn d-none d-lg-block d-xl-block" onClick={handleClick}>SEARCH FOR BLOOD DONATION CAMPS</button>
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
