import React, { useEffect, useState } from "react";

const initialImages = [
  { img: "assets/landingPage/ministry.png", id: 1 },
  { img: "assets/landingPage/electronics.png", id: 2 },
  { img: "assets/landingPage/cdac.png", id: 3 },
  { img: "assets/landingPage/digitalindia.png", id: 4 },
  { img: "assets/landingPage/indiagov.png", id: 5 },
  { img: "assets/landingPage/mygov.png", id: 6 },
];

export default function FooterCarousel() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null);

  // Update visible count based on window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1400) setVisibleCount(6);
      else if (width >= 1200) setVisibleCount(5);
      else if (width >= 991) setVisibleCount(4);
      else if (width >= 768) setVisibleCount(3);
      else setVisibleCount(2);
    };

    handleResize(); // initial check
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
        setStartIndex((prev) =>
          (prev - 1 + initialImages.length) % initialImages.length
        );
      }
      setIsAnimating(false);
    }, 400); // match transition time
  };

  // Create visible image list by rotating from startIndex
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
            src="assets/landingPage/arrow__left.svg"
            alt=""
            style={{ cursor: "pointer" }}
          />
          <div className="image__strip-container overflow-hidden w-100">
            <div
              className={`image__strip-inner d-flex justify-content-around ${isAnimating ? "animate" : ""}`}
              style={{
                transform: `translateX(${direction === "left" ? "-20px" : direction === "right" ? "20px" : "0"})`,
                transition: 'transform 0.4s ease-in-out'
              }}
            >
              {getVisibleImages().map((item) => (
                <a href="#" key={item.id}>
                  <img src={item.img} className="footer__img" />
                </a>
              ))}
            </div>
          </div>
          <img
            onClick={() => handleScroll("right")}
            className="scroll__right"
            src="assets/landingPage/arrow__right.svg"
            alt=""
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </section>
  );
}
