import React, { useState } from "react";

export default function Service() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const cards = [
    {
      imgSrc: "assets/images/blood-search.png",
      altText: "Blood Availability Search",
      cardText: "Blood Availability Search",
      // url: '#/publicPages/bloodAvailabilitySearch'
      url: "/BLDAHIMS/bloodbank/stockAvailability.cnt",
    },
    {
      imgSrc: "assets/images/blood-directory.png",
      altText: "Blood Center Directory",
      cardText: "Blood Center Directory",
      // url: '#/publicPages/bloodBankDirectory'
      url: "/BLDAHIMS/bloodbank/nearbyBBRed.cnt",
    },
    {
      imgSrc: "assets/images/blood-camp.png",
      altText: "Blood Donation Camps",
      cardText: "Blood Donation Camps",
      // url: '#/publicPages/campSchedule'
      url: "/BLDAHIMS/bloodbank/campSchedule.cnt",
    },
    {
      imgSrc: "assets/images/donor-login.png",
      altText: "Donor Login",
      cardText: "Donor Login",
      // url: '#/pages/portalDonorLogin'
      url: "/BLDAHIMS/bloodbank/portalDonorLogin.cnt",
    },
    {
      imgSrc: "assets/images/register-camp.png",
      altText: "Register Voluntary Blood Camp",
      cardText: "Register Voluntary Blood Camp",
      // url: '#/publicPages/campRegistration'
      url: "/BLDAHIMS/bloodbank/onlineCampRequestNewBB.cnt",
    },
  ];

  return (
    <>
      <section className="service mt-3">
        <div className="bg-img">
          <div className="container">
            <h3 className="section-heading text-center pb-3">
              Our Services
            </h3>

            <div className="cards d-flex justify-content-center">
              <div className="row justify-content-center w-100">
                {cards.map((card, index) => (
                  <div className="col-xl-2 col-lg-4 col-sm-6 col-12 mb-3 mb-xl-4">
                    <a href={card.url} className="text-decoration-none">
                      <div className="card h-100" key={index}>
                        <div
                          className={`card-box ${
                            hoveredCard === index ? "zoom-in" : ""
                          }`}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <img
                            src={card.imgSrc}
                            className="card-img-top"
                            alt={card.altText}
                          />
                          <div className="card-body">
                            <p className="card-text pt-4 text-center">
                              {card.cardText}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
                <div className="col-xl-2 col-lg-4 col-sm-6 col-12 mb-3 mb-xl-4">
                  <a
                    href="http://eraktkosh.mohfw.gov.in/Blood_Bank/service/pledge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <div className="card h-100">
                      <div
                        className={`card-box ${
                          hoveredCard === 5 ? "zoom-in" : ""
                        }`}
                        onMouseEnter={() => handleMouseEnter(5)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          style={{ width: "160px", height: "60px" }}
                          src="assets/images/pledge-logo.png"
                          className="card-img-top"
                          alt="Pledge"
                        />
                        <div className="card-body">
                          <p className="card-text pt-4 text-center">
                            MyGov Pledge
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
