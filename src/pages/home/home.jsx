import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ContrastTable from "../../components/contrastTable/contrastTable";
import ContrastSummary from "../../components/contrastSummary/contrastSummary";
import MockupPage from "../../components/mockupPage/mockupPage";
import MyColors from "../../components/myColors/myColors";
import Footer from "../../components/footer/footer";
import { checkColors } from "../../color-checker";
import { getColorsFromDefaultPalette } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const [colorList, setColorList] = useState(getColorsFromDefaultPalette(5, 0)); 
  const [tableList, setTableList] = useState([""]);
  const [contrastMatrix, setContrastMatrix] = useState([""].concat(colorList));

  //denne kjører hver gang colorList oppdateres
  useEffect(() => {
    setTableList([""].concat(colorList)); //samme som colorList men med ett tomt felt først
  }, [colorList]);

  useEffect(() => {
    setupContrastMatrix();
  }, [tableList]);

  //Lager matrise av fargelisten
  const setupContrastMatrix = () => {
    const table = [];
    for (let row in tableList) {
      let rowObject = [];
      for (let column in tableList) {
        rowObject.push(getCellValue(row, column));
      }
      table.push(rowObject);
    }
    setContrastMatrix(table);
  };

  const getCellValue = (rowIndex, columnIndex) => {
    if (rowIndex === columnIndex) return ""; //returnerer tom fordi det er samme fargene
    if (rowIndex == 0) return tableList[columnIndex];
    else if (columnIndex == 0) {
      return tableList[rowIndex];
    }
    return getContrast(rowIndex, columnIndex);
  };

  //bruker den importerte metoden fra color API
  const getContrast = (rowIndex, columnIndex) => {
    const color1 = tableList[columnIndex];
    const color2 = tableList[rowIndex];
    const colorComparison = checkColors(color1, color2);
    return colorComparison.contrast; 
  };

  return (
    <div className="App">
      <div className="colorBar">
        <MyColors
          colorList={colorList}
          setColorList={setColorList}
        />
      </div>
      <div className="rightSideBar">
        <NavBar
          title={t('title')}
          backgroundColor="#f8f5f2"
          textColor="#1f1235"  
        />
          <ContrastTable contrastMatrix={contrastMatrix}></ContrastTable>
          <ContrastSummary contrastMatrix={contrastMatrix}></ContrastSummary>
          <MockupPage contrastMatrix={contrastMatrix} colorList={colorList}></MockupPage>
          <Footer
          backgroundColor="#f8f5f2"
          textColor="#1f1235"  
          text={t('footer-text')}
          />
        
      </div>
    </div>
  );
}

export default Home;
