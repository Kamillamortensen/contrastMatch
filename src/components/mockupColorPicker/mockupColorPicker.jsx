import "./mockupColorPicker.css";
import React, {useState} from "react";
import ColorizeIcon from '@mui/icons-material/Colorize';
import { getBlackOrWhiteAsBestContrast } from "../../contrast-calculations";


const MockupColorPicker = ({ chosenColor, setChosenColor, colorList, topColorPicker, bottomColorPicker }) => {
    const [colorsVisibility, setcolorsVisibility] = useState(false);

  return (
    <div className="mockup-color-picker">
        <button className = {topColorPicker ? "mockup-color-bar-color mockup-color-bar-color-top" : bottomColorPicker ? "mockup-color-bar-color mockup-color-bar-color-bottom" : "mockup-color-bar-color" }  
        style={{ backgroundColor: chosenColor }} onClick={() => setcolorsVisibility(!colorsVisibility)}>
            <ColorizeIcon style={{color : getBlackOrWhiteAsBestContrast(chosenColor)}}></ColorizeIcon>
        </button>      
        <ul className="mockup-color-picker-list" style={{ display: colorsVisibility ?  "flex" : "none" }}> 
            {Object.values(colorList).map((color, index) => (
                <li className="color-picker-list-item-wrap">
                    <button onClick={() => setChosenColor(color)} className="colorBlock" style={{ backgroundColor: color }}></button>
                </li>
            ))}
        </ul>
    </div>
  );
};


export default MockupColorPicker;