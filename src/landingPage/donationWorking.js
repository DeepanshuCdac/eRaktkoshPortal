import React from 'react'

export default function Donationworking() {

  const donationCards = [
    {
      imgSrc: "assets/images/reg-img.png",
      cardText: "Registration Process",
      altText: "Sign up and schedule your first  with ease",
    },
    {
      imgSrc: "assets/images/heart-img.png",
      cardText: "Health Screening",
      altText: "A simple check-up to ensure you’re ready to donate",
    },
    {
      imgSrc: "assets/images/pay-img.png",
      cardText: "Donation Day",
      altText: "Relax as our professional staff guide you through",
    },
  ];

  return (
    <>
      <section className="donation-working mt-5">
        <div className="donation-bg-img">
          <div className="container">
            <h3 className="section-heading text-center py-5">
              How <span className="donation">Donation</span> Works?
            </h3>
            <div className="d-xl-flex justify-content-between">
              {donationCards.map((card, index) => (
                <React.Fragment key={index}>
                  <div className="card-container pb-4">
                    <div className="card h-100 align-items-center pt-4">
                      <img
                        src={card.imgSrc}
                        className="img-fluid"
                        alt="..."
                        width="78px"
                        height="78px"
                      />
                      <div className="card-body text-center pt-4 pb-3">
                        <p className="card-text mb-0">{card.cardText}</p>
                        <p className="card-text-light mb-0">{card.altText}</p>
                      </div>
                    </div>
                  </div>

                  {(index === 0 || (index + 1) % 2 === 0) && (
                    <div className="arrow-container mb-3 d-flex align-items-center justify-content-center">
                      <img
                        src="assets/images/arrow-left.png"
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
