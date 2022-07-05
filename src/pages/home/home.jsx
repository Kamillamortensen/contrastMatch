import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ColorInput from "../../components/colorInput/colorInput";
import ContrastTable from "../../components/contrastTable/contrastTable";
import ContrastPreview  from "../../components/contrastPreview/contrastPreview";
import {checkColors} from "../../color-checker"; 

function Home() {
  const [colorList, setColorList] = useState(["#000000"]);
  const [tableList, setTableList] = useState([""]); 
  const [contrastMatrix, setContrastMatrix] = useState([""].concat(colorList));

  //denne kjører hver gang colorList oppdateres
  useEffect(() => {
    setTableList([""].concat(colorList)); //samme som colorList men med ett tomt felt først
  },[colorList]);

  useEffect(() =>{
    setupContrastMatrix();
  },[tableList])

  const setupContrastMatrix = () => {
    const table = []
    for(let row in tableList){
      let rowObject = []
      for(let column in tableList){
        rowObject.push(getCellValue(row,column))
      }
      table.push(rowObject)
    }
    console.log("matrix laget", table)
    setContrastMatrix(table)
  }

  const getCellValue = (rowIndex, columnIndex) => {
    if(rowIndex === columnIndex) return "" //returnerer tom fordi det er samme fargene
    if(rowIndex == 0) return tableList[columnIndex]; 
    else if (columnIndex == 0){ return tableList[rowIndex];}
    return getContrast(rowIndex,columnIndex); 
  }

  //bruker den importerte metoden fra color API 
  const getContrast = (rowIndex, columnIndex) => {
    const color1 =  tableList[columnIndex];
    const color2 = tableList[rowIndex];
    const contrast = checkColors(color1, color2); 
    return contrast.contrast; //contrast har mange verdier. Console.log for å se alle muligheter:)
  }

  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  // todo: flytt inn i myColors-component
  const updateColorValue = (index, newValue) => {
    setColorList(colors => colors.map((value, i) => i === index ? newValue : value))
  }

  // todo: flytt inn i myColors-component
  const removeColorValue = (index) => {
    setColorList((colorList) => colorList.filter((_, i) => i !== index.index))
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="content">
        <div className="contentGroup">
          <h1>Dine farger</h1>          
          <div className="inputFields">
            {colorList.map((color, index) => (
              <ColorInput key={"color"+index} index={index} colorValue={color} updateColorValue={updateColorValue} removeColorValue={removeColorValue} ></ColorInput>
            ))}
          </div>
          <button onClick={() => setColorList((colorList) => [...colorList, "#000000"])}>
            legg til fargekode
          </button>
        </div>
        <div className="contentGroup">
          <h1>Her kommer tabell med størrelse {Object.keys(colorList).length+1} x {Object.keys(colorList).length+1} </h1>
          <ContrastTable contrastMatrix={contrastMatrix}></ContrastTable>
        </div>
        <div className="contentGroup">
          <h1>Her kommer visning av komponenter i fargene</h1>
          <ContrastPreview title="gode matcher"></ContrastPreview>
          <ContrastPreview title="dårligere matcher"></ContrastPreview>
        </div>
      </div>
    
    </div>
  );
}

export default Home;
