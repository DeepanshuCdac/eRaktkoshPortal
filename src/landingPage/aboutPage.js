import React from 'react'

export default function Aboutpage() {

  const handleButtonClick = () => {
    window.location.href = '/BLDAHIMS/bloodbank/about.cnt';
  };

  return (
    <>
      <section className="about-section">
        <div className="bg-img">
          <div className="container">
            <div className="about-box w-100">
              <div className="about-container pb-4">
                <h3 className="section-heading text-center pt-5 pb-3">
                  About e-Raktkosh
                </h3>
                <div>
                  <p className="about-text">
                    e-Raktkosh is a platform to provide information about blood
                    banks, blood availability, blood donation camps and assistant
                    automation. More than 3800 blood banks are registered on
                    e-Raktkosh from 29 states and 8 UTs.
                  </p>
                  <p className="about-text">
                    e-Raktkosh is a citizen centric portal and mobile app for
                    various services such as nearest blood bank, blood
                    availability & blood donation camps information. It enforces
                    blood banks to strictly follow national blood policy standards
                    and guidelines.
                  </p>
                </div>
                <button className="btn readBtn" onClick={handleButtonClick}>
                  Read More{" "}
                  <img
                    className="ms-2"
                    src="assets/images/arrow-right.png"
                    alt="Arrow-right"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
