// import React, { useState, useEffect } from "react";
// import "../scss/gallery.scss";

// const images = [
//   { src: "assets/images/about-bg.png", title: "MP State Training at NIB June 2019" },
//   { src: "assets/images/fgt-password-img.png", title: "J&K Initiate Barcoding" },
//   { src: "assets/images/loginImg.png", title: "GEMS of Digital India 2019 Award" },
//   { src: "assets/images/tabImg3.png", title: "Blood Donation Camp" },
//   { src: "assets/images/doctor.png", title: "Team Training Meet" },
//   { src: "assets/images/img6.jpg", title: "Recognition Event" }
// ];

// export default function Gallery() {
//   const [activeIndex, setActiveIndex] = useState(1); // Middle by default

//   const goToPrev = () => {
//     if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
//   };
  
//   const goToNext = () => {
//     if (activeIndex > 0) setActiveIndex(activeIndex - 1);
//   };
  

//   const handleKey = (e) => {
//     if (e.key === "ArrowLeft") goToPrev();
//     else if (e.key === "ArrowRight") goToNext();
//   };

//   useEffect(() => {
//     document.addEventListener("keydown", handleKey);
//     return () => document.removeEventListener("keydown", handleKey);
//   });

//   return (
//     <div className="gallery-wrapper">
//       <div className="carousel-main">
//         <button className="nav-btn left" onClick={goToPrev}>&gt;</button>

//         {images.map((img, index) => {
//           let className = "carousel-item";
//           if (index === activeIndex) className += " active";
//           else if (index === activeIndex - 1) className += " prev";
//           else if (index === activeIndex + 1) className += " next";
//           else className += " hidden";

//           return (
//             <div key={index} className={className}>
//               <img src={img.src} alt={img.title} />
//               <h5>{img.title}</h5>
//               <p>Lorem ipsum is a dummy text used in web development.</p>
//             </div>
//           );
//         })}

//         <button className="nav-btn right" onClick={goToNext}>&lt;</button>
//       </div>

//       <div className="carousel-thumbnails">
//         {images.map((img, index) => (
//           <div
//             key={index}
//             className={`thumbnail ${index === activeIndex ? "selected" : ""}`}
//             onClick={() => setActiveIndex(index)}
//           >
//             <img src={img.src} alt={`Thumb ${index}`} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
