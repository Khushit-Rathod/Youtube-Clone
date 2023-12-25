import React, { useState } from "react";
import "./_categoriesBar.scss";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";

const keywords = [
  "All",
  "React JS",
  "Angular JS",
  "React Native",
  "HTML",
  "CSS",
  "Javascript",
  "APIs",
  "Redux",
  "Data Structures and Algorithms",
  "Artificial Intelligence",
  "Cybersecurity",
  "Music",
  "Best Songs",
  "Sports",
  "Entertainment",
  "World News",
  "Gaming",
  "Esports",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");
  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <div className="CategoriesBar">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
