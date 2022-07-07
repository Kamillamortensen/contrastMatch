import "./contrastTable.css";
import React, { useState } from "react";

const ContrastTable = ({ contrastMatrix }) => {
  const [contrastColors] = useState({
    none: "#F2B8B8",
    AA: "#F2E9B8",
    AAA: "#B7F1B8",
  }); //endre her hvis andre farger er ønskelig!
  const [colorsInTable, setColorsInTable] = useState(false); 

  //Sjekker om verdien er en hex og returnerer fargen hvis ja
  const isHex = (possibleHex) => {
    const RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    return possibleHex.length === 7 && RegExp.test(possibleHex)
      ? true
      : false;
  };

  //Sjekker om verdien er kontrast, og returnerer evt passende farge etter oppfylte krav
  const getCellColorFromContrast = (possibleContrast) => {
    return possibleContrast >= 1 && possibleContrast <= 21 //kontraster er et tall mellom 1-21
      ? possibleContrast < 4.5
        ? contrastColors.none
        : 4.5 <= possibleContrast && possibleContrast < 7.0
        ? contrastColors.AA
        : contrastColors.AAA
      : "";
  };

  const getRowColor = (rowIndex, colIndex, rowItem) => {
    if(1 <= rowItem <= 21) return contrastMatrix[0][rowIndex]
    else return "";
  }

  const getColumnColor = (rowIndex, colIndex, rowItem) => {
    return contrastMatrix[colIndex][0];
  }

  const toggle = () => {
    setColorsInTable(!colorsInTable);
  }

  return (
    <div className="contrastTable">
      <div className="tableHeader">
        <h1>Tabellvisning</h1>
        <div className="toggle">
          <h3>Vis {colorsInTable ? "standardvisning" : "fargekombinasjoner"}</h3>
          <label className="switch">
            <input type="checkbox" onChange={toggle}/>
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      
      <table>
        <tbody>
          {contrastMatrix.map((row, rowIndex) => (
            <tr key={"row" + rowIndex}>
              {Object.values(row).map((rowItem, colIndex) => (
                <td
                  key={"row" + rowIndex + "col" + colIndex}
                  style={{ backgroundColor: colorsInTable && colIndex != 0 && rowIndex != colIndex ? getRowColor(rowIndex, colIndex, rowItem) : getCellColorFromContrast(rowItem) }}
                >
                  <div
                    style={{ backgroundColor: isHex ? rowItem : "" }}
                    className="colorBox"
                  />
                  <div  style={{ color: colorsInTable && rowIndex != 0 ?  getColumnColor(rowIndex, colIndex, rowItem) : "#000000" }}>{rowItem}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ContrastTable;
