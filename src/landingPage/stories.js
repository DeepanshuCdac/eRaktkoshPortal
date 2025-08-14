import { Button } from "antd";
import React, { useEffect, useState } from "react";

const gallery = [
  {
    src: "assets/gallery/bihar_state_training_1.jpg",
    title: "J&K Initiate Barcoding",
  },
  {
    src: "assets/gallery/bihar_state_training.jpg",
    title: "Bihar State Training At Patna 18-Jan-21 to 18-Jan-21",
  },
  {
    src: "assets/gallery/Cuttak_training.jpg",
    title: "IRCS Cuttak Training At Cuttak 19-Feb-21 to 21-Feb-21",
  },
  {
    src: "assets/gallery/UPT3.jpg",
    title: "Uttar Pradesh Training At NIB Noida 16-Sep-19 to 22-Sep-19",
  },
  {
    src: "assets/gallery/UPT2.jpg",
    title: "Uttar Pradesh Training At NIB Noida 16-Sep-19 to 22-Sep-19",
  },
  {
    src: "assets/gallery/UPT1.jpg",
    title: "Uttar Pradesh Training At NIB Noida 16-Sep-19 to 22-Sep-19",
  },
  {
    src: "assets/gallery/GEMS_AWARD.jpg",
    title: "Gems of Digital India 2019 Awards",
  },
  {
    src: "assets/gallery/GEMS_PIC.jpg",
    title: "Gems of Digital India 2019 Awards",
  },
  {
    src: "assets/gallery/11_org.jpg",
    title: "MP State Training At NIB June 2019",
  },
  {
    src: "assets/gallery/12_org.jpg",
    title: "MP State Training At NIB June 2019",
  },
  {
    src: "assets/gallery/13_org.jpg",
    title: "MP State Training At NIB June 2019",
  },
  {
    src: "assets/gallery/7_org.jpg",
    title: "eRaktKosh Launch at World Health Day 2016",
  },
];

export default function Stories() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1040);
  const [galleryActive, setGalleryActive] = useState(true);
  const [videoActive, setVideoActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < gallery.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1040);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleGalleryActive = () => {
    setGalleryActive(true);
    setVideoActive(false);
  };

  const handleVideoActive = () => {
    setGalleryActive(false);
    setVideoActive(true);
  };

  return (
    <>
      <section className="stories__section mb-3">
        <div className="container">
          {isMobile ? (
            <div className="bg_img p-4">
              <div className="mb-3">
                <h4 className="mb-1 heading">Our gallery</h4>
                <p className="mb-0 section__overview">
                  Lives Saved. Hope Restored. Discover how e-Raktkosh <br /> is
                  making a difference every day.
                </p>
              </div>
              <div className="tabs__section" style={{ gap: "20px" }}>
                <Button
                  className={`tabs__btn px-5 py-4 mb-3 ${
                    galleryActive ? "active" : ""
                  }`}
                  onClick={handleGalleryActive}
                >
                  Gallery
                </Button>
              </div>
              {galleryActive && !videoActive ? (
                <div className="images__section">
                  <a
                    href="javascript:void(0)"
                    className="view_btn mb-3 d-flex justify-content-end"
                  >
                    View All
                  </a>

                  <div className="gallery_scroller">
                    {gallery.map((img, index) => (
                      <div key={index} className="gallery_item">
                        <img
                          className="gallery__images"
                          src={img.src}
                          alt={img.title}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>Video</div>
              )}
            </div>
          ) : (
            <div>
              <div className="bg_img p-4 d-flex align-items-center">
                <div className="">
                  <h4 className="mb-1 heading">Our gallery</h4>
                  <p className="mb-0 section__overview">
                    Lives Saved. Hope Restored. Discover how e-Raktkosh <br />{" "}
                    is making a difference every day.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-xl-5 col-lg-4 col-md-4 d-flex align-items-baseline mt-4">
                  <div className="tabs__section d-flex flex-column">
                    <div>
                      <Button
                        className={`tabs__btn px-5 py-4 mb-3 w-100 ${
                          galleryActive ? "active" : ""
                        }`}
                        onClick={handleGalleryActive}
                      >
                        Gallery
                      </Button>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="col-6 col-xl-7 col-lg-8 col-md-8">
                  <div className="images__section d-flex align-items-center justify-content-center">
                    <div>
                      <img
                        style={{ cursor: "pointer" }}
                        src="assets/landingPage/back.svg"
                        alt=""
                        onClick={handlePrev}
                      />
                    </div>
                    {galleryActive && !videoActive ? (
                      <div className="">
                        <a
                          href="javascript:void(0)"
                          className="view_btn mb-3 d-flex justify-content-end"
                        >
                          View All
                        </a>
                        <div className="gallery_container">
                          {gallery
                            .slice(currentIndex, currentIndex + itemsPerPage)
                            .map((images, index) => (
                              <div key={index} className="gallery_item">
                                <img
                                  className="gallery__images"
                                  src={images.src}
                                  alt={images.title}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div>Video</div>
                    )}
                    <div>
                      <img
                        style={{
                          transform: "rotate(180deg)",
                          cursor: "pointer",
                        }}
                        className=""
                        src="assets/landingPage/back.svg"
                        alt=""
                        onClick={handleNext}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
