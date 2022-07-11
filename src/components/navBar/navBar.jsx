import "./navBar.css";
import React from "react";

const NavBar = ({ title, backgroundColor, textColor }) => {
  return (
    <div
      className="navBar"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        position: "static",
      }}
    >
      <div className="title">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default NavBar;
