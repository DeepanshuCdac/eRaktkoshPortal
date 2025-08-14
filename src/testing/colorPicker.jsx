import { Select } from "antd";
import React, { useState } from "react";

export default function ColorPicker() {
  const list = [
    {
      id: 1,
      color: "#000",
      colorText: "black",
    },
    {
      id: 2,
      color: "#fff",
      colorText: "white",
    },
    {
      id: 3,
      color: "#7A1232",
      colorText: "red",
    },
  ];

  const [selected, setSelected] = useState();

  const handleOptionChange = (e) => {
    setSelected(e);
  };

  const selectedColorCode = list.find(
    (item) => item.colorText === selected
  )?.color;

  return (
    <>
      <div className="container d-flex">
        <Select
          className="w-100"
          value={selected}
          options={list.map((item) => ({
            value: item.colorText,
            label: item.colorText,
          }))}
          placeholder="Select a color"
          onChange={handleOptionChange}
        />

        <div
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid",
            background: selectedColorCode,
          }}
        >
          colour this div
        </div>
      </div>
    </>
  );
}
