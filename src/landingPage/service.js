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
      url: '/BLDAHIMS/bloodbank/stockAvailability.cnt'
    },
    {
      imgSrc: "assets/images/blood-directory.png",
      altText: "Blood Bank Directory",
      cardText: "Blood Bank Directory",
      url: '/BLDAHIMS/bloodbank/nearbyBBRed.cnt'
    },
    {
      imgSrc: "assets/images/blood-camp.png",
      altText: "Blood Donation Camps",
      cardText: "Blood Donation Camps",
      url: '/BLDAHIMS/bloodbank/campSchedule.cnt'
    },
    {
      imgSrc: "assets/images/donor-login.png",
      altText: "Donor Login",
      cardText: "Donor Login",
      url: '/BLDAHIMS/bloodbank/portalDonorLogin.cnt'
    },
    {
      imgSrc: "assets/images/register-camp.png",
      altText: "Register Voluntary Blood Camp",
      cardText: "Register Voluntary Blood Camp",
      url: '/BLDAHIMS/bloodbank/onlineCampRequestNewBB.cnt'
    },
  ];

  return (
    <>
      <section className="service">
        <div className="bg-img">
          <div className="container">
            <h3 className="section-heading text-center pt-5 pb-3">
              Our Services
            </h3>

            <div className="cards d-flex justify-content-center">
              <div className="row justify-content-center w-100">
                {cards.map((card, index) => (
                  <div className="col-xl-2 col-lg-4 col-sm-6 col-12 mb-3 mb-xl-4">
                     <a href={card.url} className="text-decoration-none">
                    <div className="card h-100" key={index}>
                      <div
                        className={`card-box ${hoveredCard === index ? "zoom-in" : ""
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
