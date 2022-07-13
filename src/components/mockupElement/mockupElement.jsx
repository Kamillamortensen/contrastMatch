import "./mockupElement.css";
import React from "react";
import ColorizeIcon from '@mui/icons-material/Colorize';

const MockupElement = ({ title, titleIcon, backgroundColor, textColor, mainText, color1, color2 }) => {
  return (
    <div
      className="mockupElement"
      style={{
        backgroundColor: color1,
        color: textColor
      }}
    >
        <div className="mockup-color-bar">
            <div className="mockup-color-bar-color mockup-color-bar-color-top" style={{ backgroundColor: color1 }}>
                <ColorizeIcon></ColorizeIcon>
            </div>
            <div className="mockup-color-bar-color mockup-color-bar-color-bottom" style={{ backgroundColor: color2 }}>
                <ColorizeIcon></ColorizeIcon>
            </div>
        </div>
        <div className="mockup-element-content">
            <div className="title">
                <div style={{ color: color2 }}>{titleIcon}</div>
                <h1 className="h1-text-box" style={{ color: color2 }}>{title}</h1>
            </div>
            <div>
                <p className="p-text-box" style={{ color: color2 }}>{mainText}</p>
            </div>
        </div>
    </div>
  );
};

export default MockupElement;
