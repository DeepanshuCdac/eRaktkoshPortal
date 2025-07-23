import { Button } from "antd";
import React, { useState, useEffect } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 100);
  };

  const scrollToTop = () => {
    window.scroll({ top: 0, right: 0, behaviour: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
      <div className={`scroll-to-top ${isVisible ? "show" : ""}`}>
        <Button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          icon={<ArrowCircleUpIcon />}
        />
      </div>
    </>
  );
}
