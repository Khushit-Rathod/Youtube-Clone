import React, { useState } from "react";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md"; //md=material design
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };
  const photoURL = useSelector((state) => state.auth?.user);
  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />
      <img
        src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt=""
        className="header__logo"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <dic className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={photoURL} alt="avatar" />
      </dic>
    </div>
  );
};

export default Header;
