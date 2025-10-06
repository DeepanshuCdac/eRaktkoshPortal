import { Button, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Swiggy() {
  const [card, setCard] = useState([]);
  const [sortCard, setSortCard] = useState([]);
  const [inputText, setInputText] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5759152&lng=77.35734479999999&restaurantId=364466&catalog_qa=undefined&submitAction=ENTER"
      );
      console.log("Swiggy API Response : ", response);

      const cards =
        response?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
          ?.cards[3]?.card?.card?.categories;
      setCard(cards);
      setSortCard(cards);

      console.log("Swiggy Card value set : ", card);
      console.log("Swiggy Cards value set : ", cards);
    } catch (error) {
      console.log("Fetch API error : ", error);
    }
  };

  const handleItemSort = () => {
    const filteredCard = card.filter((card) => card?.title.length > 10);
    setSortCard(filteredCard);
  };

  const handleSearch = () => {
    console.log("swiggy entered text value : ", inputText);

    const filtered = card.filter((card) =>
      card.title?.toLowerCase().includes(inputText.toLowerCase())
    );
    setSortCard(filtered);
  };

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      console.log("Swiggy : ", theme);
    } else {
      setTheme("light");
      console.log("Swiggy : ", theme);
    }
  };

  return (
    <div className="container">
      <h1>Swiggy</h1>
      <div className={`${theme} `}>
        <div className="d-flex">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <Button onClick={handleItemSort}>Sort</Button>
        {sortCard.map((singleCard, idx) => (
          <div key={idx} className="d-flex gap-3">
            <p>{singleCard.title}</p>
            <p>{singleCard.categoryId}</p>
          </div>
        ))}
      </div>

      <Button onClick={handleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </div>
  );
}
