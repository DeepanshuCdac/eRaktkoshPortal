import React, { useEffect, useState } from "react";

const initialImages = [
  {
    img: `${process.env.PUBLIC_URL}/assets/landingPage/ministry.png`,
    src: "https://mohfw.gov.in/",
    id: 1,
  },
  // { img: "assets/landingPage/electronics.png", id: 2 },
  {
    img: `${process.env.PUBLIC_URL}/assets/landingPage/cdac.png`,
    src: "https://cdac.in/index.aspx?id=ND",
    id: 2,
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/landingPage/digitalindia.png`,
    src: "https://dic.gov.in/",
    id: 3,
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/landingPage/indiagov.png`,
    src: "https://v2.india.gov.in/services/details/e-raktkosh-blood-doner-login",
    id: 4,
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/landingPage/mygov.png`,
    src: "https://pledge.mygov.in/world-blood-donorday-2023/",
    id: 5,
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/landingPage/nhm.jpg`,
    src: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1214&lid=498",
    id: 6,
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/landingPage/india-portal-logo.png`,
    src: " https://services.india.gov.in/service/detail/e-raktkosh-blood-stock-availability-1",
    id: 7,
  },
];

export default function FooterCarousel() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1400) setVisibleCount(5);
      else if (width >= 1200) setVisibleCount(5);
      else if (width >= 991) setVisibleCount(4);
      else if (width >= 768) setVisibleCount(3);
      else if (width >= 463) setVisibleCount(2);
      else setVisibleCount(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (dir) => {
    if (isAnimating) return;

    setDirection(dir);
    setIsAnimating(true);

    setTimeout(() => {
      if (dir === "left") {
        setStartIndex((prev) => (prev + 1) % initialImages.length);
      } else {
        setStartIndex(
          (prev) => (prev - 1 + initialImages.length) % initialImages.length
        );
      }
      setIsAnimating(false);
    }, 400);
  };

  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(initialImages[(startIndex + i) % initialImages.length]);
    }
    return visible;
  };

  return (
    <section className="footer__carousel p-4">
      <div className="container">
        <div className="image__strip-wrapper d-flex align-items-center justify-content-between">
          <img
            onClick={() => handleScroll("left")}
            className="scroll__left"
            src={`${process.env.PUBLIC_URL}/assets/landingPage/arrow__left.svg`}
            alt=""
            style={{ cursor: "pointer" }}
          />
          <div className="image__strip-container overflow-hidden w-100">
            <div
              className={`image__strip-inner d-flex justify-content-around ${
                isAnimating ? "animate" : ""
              }`}
              style={{
                transform: `translateX(${
                  direction === "left"
                    ? "-20px"
                    : direction === "right"
                    ? "20px"
                    : "0"
                })`,
                transition: "transform 0.4s ease-in-out",
              }}
            >
              {getVisibleImages().map((item) => (
                <a href={item.src} key={item.id}>
                  <img
                    style={{ width: "70px", height: "55px" }}
                    src={item.img}
                    className="footer__img"
                  />
                </a>
              ))}
            </div>
          </div>
          <img
            onClick={() => handleScroll("right")}
            className="scroll__right"
            src={`${process.env.PUBLIC_URL}/assets/landingPage/arrow__right.svg`}
            alt=""
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </section>
  );
}
