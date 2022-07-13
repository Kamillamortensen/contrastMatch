import "./mockupColorPicker.css";
import React, {useState} from "react";
import ColorizeIcon from '@mui/icons-material/Colorize';


const MockupColorPicker = ({ chosenColor, setChosenColor, colorList }) => {
    const [colorsVisibility, setcolorsVisibility] = useState(false);

    const changeColor = () => {
        setChosenColor("orange")
    }


  return (
    <div aria-label="button">
        <div className="mockup-color-bar-color mockup-color-bar-color-top mockup-color-bar-color-bottom"  style={{ backgroundColor: chosenColor }} onClick={() => setcolorsVisibility(!colorsVisibility)}>
            <ColorizeIcon></ColorizeIcon>
        </div>      
        <div className="colorList" style={{ display: colorsVisibility ?  "flex" : "none" }}> 
            {Object.values(colorList).map((color, index) => (
                <div onClick={() => setChosenColor(color)} className="colorBlock" style={{ backgroundColor: color }}></div>
            ))}
        </div>
    </div>
  );
};


export default MockupColorPicker;
