import "./myColors.css";
import React, {useState} from "react";
import ColorInput from "../colorInput/colorInput";
import { getColorsFromDefaultPalette } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';
import { colorBarFormats } from "../../varialbes";

const MyColors = ({ colorList, setColorList, direction, setDirection }) => {
  const { t } = useTranslation();
  
  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  const updateColorValue = (index, newValue) => {
    setColorList((colors) =>
      colors.map((value, i) => (i === index ? newValue : value))
    );
  };

  const addColorValue = () => {
    if(colorList.length < 8)
    setColorList((colorList) => [...colorList, getColorsFromDefaultPalette(1, colorList)[0]])
  }

  const removeColorValue = (index) => {
    setColorList((colorList) =>
      colorList.filter((_, i) => i !== index.index || colorList.length === 2)
    );
  };

  const changeFormat = () => {
    setDirection(direction === colorBarFormats.VERTICAL ? colorBarFormats.HORIZONTAL : colorBarFormats.VERTICAL)
  }

  return (
    <div className={direction === colorBarFormats.VERTICAL ? "vertical-bar" : "horizontal-bar"}  aria-label={t('my-colors-heading')}>
      <button className="toggle-button" onClick={changeFormat}>toggle</button>
      <ul className="my-color-list">
        {Object.values(colorList).map((color, index) => (
          <li className="my-color-list-item">
              <ColorInput
              key={"color" + index}
              index={index}
              colorValue={color}
              updateColorValue={updateColorValue}
              removeColorValue={removeColorValue}
            ></ColorInput>
          </li>
        ))}
      </ul>
      <div className="button">
        <button className="addColorButton"
          onClick={addColorValue}
        >
          {t('add-color')}
        </button>
      </div>
    </div>
  );
};

export default MyColors;
