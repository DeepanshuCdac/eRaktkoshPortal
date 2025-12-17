import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../scss/gallery.scss";

const slides = [
  {
    title: "J&K Initiate Barcoding",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/bihar_state_training_1.jpg",
  },
  {
    title: "Bihar State Training At Patna 18-Jan-21 to 18-Jan-21",
    description:
      "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.",
    image: "assets/gallery/bihar_state_training.jpg",
  },
  {
    title: "IRCS Cuttak Training At Cuttak 19-Feb-21 to 21-Feb-21",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/Cuttak_training.jpg",
  },
  {
    title: "Uttar Pradesh Training At NIB Noida 16-Sep-19 to 22-Sep-19",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/UPT3.jpg",
  },
  {
    title: "Uttar Pradesh Training At NIB Noida 16-Sep-19 to 22-Sep-19",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/UPT2.jpg",
  },
  {
    title: "Uttar Pradesh Training At NIB Noida 16-Sep-19 to 22-Sep-19",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/UPT1.jpg",
  },
  {
    title: "Gems of Digital India 2019 Awards",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/GEMS_AWARD.jpg",
  },
  {
    title: "Gems of Digital India 2019 Awards",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/GEMS_PIC.jpg",
  },
  {
    title: "MP State Training At NIB June 2019",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/11_org.jpg",
  },
  {
    title: "MP State Training At NIB June 2019",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/12_org.jpg",
  },
  {
    title: "MP State Training At NIB June 2019",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/13_org.jpg",
  },
  {
    title: "eRaktKosh Launch at World Health Day 2016",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/7_org.jpg",
  },
  {
    title: "eRaktkosh Training at NIB",
    description: "Lorem ipsum is a dummy or placeholder text commonly",
    image: "assets/gallery/5_org.jpg",
  },
];

const GalleryCarousel = () => {
  return (
    <>
      <div className="pageWrapper">
        <div className="container">
          <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between py-3">
            <div className="d-flex align-items-center">
              <div className="inside_header">
                <h4 className="header-page mb-1">Gallery</h4>
                <div className="d-flex">
                  <a className="home_link me-2" href="/eraktkoshPortal/#/">
                    Home
                  </a>
                  <span className="home_link">&gt;</span>
                  <a href="javascript:void(0)" className="home_link ms-2">
                    Gallery
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery-carousel-container">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={2.5}
          centeredSlides={true}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 2.5,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="slide-card">
                <div className="slide-content">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
                <img src={slide.image} alt={slide.title} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default GalleryCarousel;
