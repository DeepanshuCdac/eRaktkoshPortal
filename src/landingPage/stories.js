import { Button } from "antd";
import React, { useRef } from "react";

const gallery = [
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/bihar_state_training_1.jpg`,
    title: "J&K Initiate Barcoding",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/bihar_state_training.jpg`,
    title: "Bihar State Training At Patna 18-Jan-21 to 18-Jan-21",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/Cuttak_training.jpg`,
    title: "IRCS Cuttak Training At Cuttak 19-Feb-21 to 21-Feb-21",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/UPT3.jpg`,
    title: "Uttar Pradesh Training At NIB Noida 16-Sep-19 to 22-Sep-19",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/UPT2.jpg`,
    title: "Uttar Pradesh Training At NIB Noida 16-Sep-19 to 22-Sep-19",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/UPT1.jpg`,
    title: "Uttar Pradesh Training At NIB Noida 16-Sep-19 to 22-Sep-19",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/GEMS_AWARD.jpg`,
    title: "Gems of Digital India 2019 Awards",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/GEMS_PIC.jpg`,
    title: "Gems of Digital India 2019 Awards",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/11_org.jpg`,
    title: "MP State Training At NIB June 2019",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/12_org.jpg`,
    title: "MP State Training At NIB June 2019",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/13_org.jpg`,
    title: "MP State Training At NIB June 2019",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/gallery/7_org.jpg`,
    title: "eRaktKosh Launch at World Health Day 2016",
  },
];

export default function Stories() {
  const scrollerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const { scrollLeft, clientWidth } = scrollerRef.current;
      const scrollAmount = clientWidth * 0.8; 
      scrollerRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleClick = () => {
    window.location.href =
      "/BLDAHIMS/bloodbank/transactions/bbpublicindexGallery.html";
  };

  return (
    <section className="stories__section mb-1">
      <div className="container">
        <div className="bg_img p-4">
          <div className="text_section">
            <h4 className="mb-1 heading">Our gallery</h4>
            <p className="mb-4 section__overview">
              Lives Saved. Hope Restored. Discover how e-Raktkosh <br />
              is making a difference every day.
            </p>
            <Button className="px-4 py-3" onClick={handleClick} type="primary">
              View Our Gallery
            </Button>
          </div>

          <div className="images__section position-relative">
            {/* <a
              href="/BLDAHIMS/bloodbank/transactions/bbpublicindexGallery.html"
              className="view_btn mb-3 d-flex justify-content-end"
            >
              View All
            </a> */}

            {/* Left button */}
            <button
              className="scroll-btn left-btn"
              onClick={() => scroll("left")}
            >
              &#8249;
            </button>

            <div
              className="gallery_scroller d-flex overflow-auto"
              ref={scrollerRef}
            >
              {gallery.map((img, index) => (
                <div key={index} className="gallery_item me-2">
                  <img
                    className="gallery__images"
                    src={img.src}
                    alt={img.title}
                  />
                </div>
              ))}
            </div>

            {/* Right button */}
            <button
              className="scroll-btn right-btn"
              onClick={() => scroll("right")}
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .images__section {
          position: relative;
        }
        .gallery_scroller {
          scroll-behavior: smooth;
          white-space: nowrap;
        }
        .gallery_item {
          flex: 0 0 auto;
        }
        .scroll-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          font-size: 24px;
          padding: 8px 12px;
          cursor: pointer;
          z-index: 2;
        }
        .left-btn {
          left: 0;
        }
        .right-btn {
          right: 0;
        }
      `}</style>
    </section>
  );
}
