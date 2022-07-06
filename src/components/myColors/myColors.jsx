import "./myColors.css";
import React, { useState, useEffect } from "react";
import ColorInput from "../colorInput/colorInput";

const MyColors = ({ colorList, setColorList }) => {
  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  const updateColorValue = (index, newValue) => {
    setColorList((colors) =>
      colors.map((value, i) => (i === index ? newValue : value))
    );
  };

  const removeColorValue = (index) => {
    setColorList((colorList) =>
      colorList.filter((_, i) => i !== index.index || colorList.length === 2)
    );
  };

  return (
    <div className="myColors">
      <div className="headingAndButton">
        <button
          onClick={() => setColorList((colorList) => [...colorList, "#000000"])}
        >
          legg til fargekode
        </button>
      </div>
      <div>
        <div className="inputFields">
          {Object.values(colorList).map((color, index) => (
            <ColorInput
              key={"color" + index}
              index={index}
              colorValue={color}
              updateColorValue={updateColorValue}
              removeColorValue={removeColorValue}
            ></ColorInput>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyColors;
