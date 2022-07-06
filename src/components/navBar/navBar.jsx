import "./navBar.css";
import React, { useState, useEffect } from "react";

const NavBar = ({ title, backgroundColor, textColor, topFixed, width }) => {
  return (
    <div
      className="navBar"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        top: topFixed ? 0 : "none",
        position: topFixed ? "fixed" : "relative",
        width: width,
      }}
    >
      <div className="title">
        <h1>{title}</h1>
      </div>
      <ul className="mainMenu">
        <li>
          <p>Meny (kommer)</p>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
