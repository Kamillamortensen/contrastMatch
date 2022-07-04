import "./colorInput.css";
import React, { useState, useEffect } from "react";

const ColorInput = ({colorValue, index, updateColorValue}) => {

  useEffect(() => {
  },[]);

  return (
    <div className="colorInput">
      <input type="color" value={colorValue.colorValue} 
      onInput={e => {
        {updateColorValue(index, e.target.value)}
    }}
      ></input>
      <p>{colorValue}</p>
    </div>
  );
};

export default ColorInput;