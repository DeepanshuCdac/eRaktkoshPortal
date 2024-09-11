import React from "react";

const items = [
  {
    imgSrc: "assets/images/time.png",
    copy: 'It takes only an hour',
    copyTxt: "Donate blood save lives!",
    btnTxt: "Learn More"
  },
  {
    imgSrc: "assets/images/refreshment.png",
    copy: 'You will get free refreshments after donation',
    copyTxt: "Donation of blood is safe and healthy",
    btnTxt: "Learn More"
  },
  {
    imgSrc: "assets/images/currency.png",
    copy: 'It costs nothing',
    copyTxt: "Give blood and stay healthy",
    btnTxt: "Learn More"
  },
  {
    imgSrc: "assets/images/heart.png",
    copy: 'There is nothing better than saving a life',
    copyTxt: "Every blood donor is a hero",
    btnTxt: "Learn More"
  },
];

const Card = ({ imgSrc, copy, copyTxt, btnTxt }) => (
  <div className="card px-3  pt-4 pb-2">
    <div className="">
      <img className="mb-3" src={imgSrc} width="62px" height="62px" alt="" />
      <p className="card-txt mb-0">{copy}</p>
      <p className="card-txt-light mb-1">{copyTxt}</p>
    </div>
  </div>
);

const Benefits = () => {
  return (
    <div className="carouselwrapper module-wrapper p-5">
      <div className="carousel" >
        {items.map((item, index) => (
          <Card
            key={index}
            imgSrc={item.imgSrc}
            copy={item.copy}
            copyTxt={item.copyTxt}
            btnTxt={item.btnTxt}
          />
        ))}
      </div>
    </div>
  );
};

export default Benefits;