import React, { useEffect, useState } from "react";

export default function Donationworking() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const donationCards = [
    {
      imgSrc: "assets/landingPage/register__process.svg",
      cardText: "Registration Process",
      altText: "Sign up and schedule your first  with ease",
    },
    {
      imgSrc: "assets/landingPage/health.svg",
      cardText: "Health Screening",
      altText: "A simple check-up to ensure you’re ready to donate",
    },
    {
      imgSrc: "assets/landingPage/donation.svg",
      cardText: "Donation Day",
      altText: "Relax as our professional staff guide you through",
    },
  ];

  return (
    <>
      <section className="donation__working mt-2 mb-5">
        <div className="container">
          <div className="donation-bg-img py-4 px-3">
            <div className="text-center image__container mb-4">
              <div className="" style={{ position: "relative" }}>
                <h3 className="section__heading">How Donation Works</h3>
                <p className="mb-0 value">
                  Register, get a quick health check, and donate- <br />a simple
                  process to help save lives.
                </p>
                {isMobile ? (
                  <img src="assets/landingPage/section__center__r.svg" alt="" />
                ) : (
                  <img src="assets/landingPage/section__center.svg" alt="" />
                )}
              </div>
            </div>

            {isMobile ? (
              <div className="d-flex align-items-center flex-column">
                {donationCards.map((card, index) => (
                  <>
                    <div className="h-100 d-flex flex-column align-items-center pt-4">
                      <img src={card.imgSrc} className="img-fluid" alt="..." />
                      <div className="text-center py-2">
                        <p className="key mb-0">{card.cardText}</p>
                        <p className="value mb-0">{card.altText}</p>
                      </div>
                    </div>

                    {index !== donationCards.length - 1 && (
                      <div className="d-flex justify-content-center">
                        <div className="divider"></div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <div className="row align-items-center">
                {donationCards.map((card, index) => (
                  <>
                    <div key={index} className="col-2">
                      <div className="h-100 d-flex flex-column align-items-center pt-4">
                        <img
                          src={card.imgSrc}
                          className="img-fluid"
                          alt="..."
                        />
                        <div className="text-center py-2">
                          <p className="key mb-0">{card.cardText}</p>
                          <p className="value mb-0">{card.altText}</p>
                        </div>
                      </div>
                    </div>
                    {index !== donationCards.length - 1 && (
                      <div className="col-3 d-flex justify-content-center">
                        <div className="divider"></div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
