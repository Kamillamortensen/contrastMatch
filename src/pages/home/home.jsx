// SPDX-License-Identifier: GPL-3.0-or-later
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import ContrastTable from "../../components/contrastTable/contrastTable";
import MockupTextBox from "../../components/mockupTextBox/mockupTextBox";
import MockupIllustration from "../../components/mockupIllustration/mockupIllustration"
import MyColors from "../../components/myColors/myColors";
import MockupGraph from "../../components/mockupGraph/mockupGraph";
import Footer from "../../components/footer/footer";
import TextBox from "../../components/textBox/textBox";
import { checkColors } from "../../color-checker";
import { getColorsFromDefaultPalette, getContrastList  } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import HandymanIcon from '@mui/icons-material/Handyman';
import { contrastColors, defaultColorPalettes, wcagRules as w } from "../../variables";
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import MockupButton from "../../components/mockupButton/mockupButton";
import ContrastSummaryBox from "../../components/contrastSummaryBox/contrastSummaryBox";
import ContrastSummary from "../../components/contrastSummary/contrastSummary";
import ColorPalette from "../../components/colorPalette/colorPalette";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Home() {
  const { t } = useTranslation();
  const [colorList, setColorList] = useState(getColorsFromDefaultPalette(0, 0)); // start with an empty palette
  const [tableList, setTableList] = useState([""]);
  const [contrastMatrix, setContrastMatrix] = useState([""].concat(colorList));

  useEffect(() => {
    //samme som colorList men med ett tomt felt først
    setTableList([""].concat(colorList)); 
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
    //returnerer tom fordi det er samme fargene
    if (rowIndex === columnIndex) return ""; 
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
    <div className="app-adaptive-bar"> 
      <div className="colorBar">
        <MyColors
          colorList={colorList}
          setColorList={setColorList}
        />
      </div>
      <div className="rightSideBar">
        <Tabs defaultActiveKey="about" id="main-tab-group" className="mb-3">
          <Tab eventKey="about" title={t('about-tab-title')}>
            <div className="tab-section">
              <div className="aboutSectionLeft">
                <div className="row">
                  <InvertColorsRoundedIcon></InvertColorsRoundedIcon>
                  <h1 className="big-title">{t('about-title')}</h1>
                </div>
                <div>
                  <p className="p-small-about">{t('about-description')} </p>
                  {/*<p className="p-small-about">{t('about-wcag')}</p>*/}
                  <a href="https://www.uutilsynet.no/fremtidig-regelverk/wcag-21-standarden/140"  target="_blank" rel="noreferrer noopener">
                    <button className="primaryButton">{t('about-button-linking-to-wcag')}</button>
                  </a> 
                </div>
              </div>
              <div className="aboutSectionRight">
                <ul className="aboutSectionTextBoxContainer" aria-label={t('about-wcag-list-heading')}>
                  <li>
                    <TextBox title={t('contrast-summary-aaa')} titleIcon={<TextFieldsIcon/>} 
                             backgroundColor={contrastColors.AAA} mainText={t('about-wcag-aaa')}></TextBox>
                  </li>
                  <li>
                    <TextBox title={t('contrast-summary-aa')} titleIcon={<TextFieldsIcon/>} 
                             backgroundColor={contrastColors.AA} mainText={t('about-wcag-aa')}></TextBox>
                  </li>
                  <li>
                    <TextBox title={t('contrast-summary-nontext-aa')} titleIcon={<AutoAwesomeMosaicIcon/>} 
                             backgroundColor={contrastColors.AANontext} mainText={t('about-wcag-nontext-aa')}></TextBox>
                  </li>
                  <li>
                    <TextBox title={t('contrast-summary-low')} titleIcon={<VisibilityOffIcon/>} 
                             backgroundColor={contrastColors.none} mainText={t('about-wcag-low')}></TextBox>
                  </li>
                </ul>
              </div>
            </div>
          </Tab>
          <Tab eventKey="palette" title={t('default-palettes-tab-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('try-default-palettes')}</h1>
              </div>
              <fieldset className="default-palettes-container">
                {Object.values(defaultColorPalettes).map((palette, index) => (
                  <div className="default-palette-container" onClick={()=>setColorList(palette)}>
                    <input id={"color-palette-"+index} type="radio"  className="radio-button"  checked={colorList == palette ? true : false}/>   
                    <ColorPalette colors={palette} labelId={"color-palette-"+index}></ColorPalette>
                  </div>
                ))}
              </fieldset>
              <div className="speech-bubble">
                <h2 className="speech-bubble-text">
                  {t('try-palette-or-try-yourself')}
                </h2>
              </div>
            </div>
          </Tab>
          <Tab eventKey="table" title={t('contrast-level-tab-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('table-section-title')}</h1>
              </div>
              <ContrastTable aria-details={t('contrast-table-title')} contrastMatrix={contrastMatrix}></ContrastTable>
            </div>
          </Tab>
          <Tab eventKey="testing" title={t('testing-tab-title')}>
            <div className="tab-section">
              <div className="mockup-section-title">
                <h1 className="big-title">{t('mockup-section-title')}</h1>
              </div>
              <div className="aboutSectionTextBoxContainer">
                <MockupTextBox colorList={colorList} title={t('mockup-textbox-header')}  
                               mainText={t('mockup-textbox-maintext')} 
                               titleIcon={<AutoAwesomeIcon/>} color1={colorList[3]} color2={colorList[2]}></MockupTextBox>
                <MockupIllustration colorList={colorList} color1={colorList[3]} color2={colorList[2]}></MockupIllustration>
                <MockupGraph colorList={colorList}></MockupGraph>
                <MockupButton colorList={colorList} contrastMatrix={contrastMatrix} color1={colorList[3]} color2={colorList[2]}></MockupButton>
              </div>
            </div>
          </Tab>
          <Tab eventKey="summary" title={t('summary-tab-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('recommendation-section-title')}</h1>
              </div>
              <div className="aboutSectionTextBoxContainer">
                <ContrastSummaryBox title={t('contrast-summary-aaa')} titleIcon={<TextFieldsIcon/>} backgroundColor={contrastColors.AAA}
                                    colorCombinationsList={getContrastList(contrastMatrix, w.aaaTextMin, w.contrastMax)}></ContrastSummaryBox>
                <ContrastSummaryBox title={t('contrast-summary-aa')} titleIcon={<TextFieldsIcon/>} backgroundColor={contrastColors.AA}
                                    colorCombinationsList={getContrastList(contrastMatrix, w.aaTextMin, w.aaTextMax)}></ContrastSummaryBox>
                <ContrastSummaryBox title={t('contrast-summary-nontext-aa')} titleIcon={<AutoAwesomeMosaicIcon/>} backgroundColor={contrastColors.AANontext}
                                    colorCombinationsList={getContrastList(contrastMatrix, w.aaNonTextMin, w.aaNonTextMax)}></ContrastSummaryBox>
                <ContrastSummaryBox title={t('contrast-summary-low')} titleIcon={<VisibilityOffIcon/>} backgroundColor={contrastColors.none}
                                    colorCombinationsList={getContrastList(contrastMatrix, w.contrastMin, w.aaNonTextMin)}></ContrastSummaryBox>
              </div>
            </div>
          </Tab>
        </Tabs>
        {/*<div><ContrastSummary contrastMatrix={contrastMatrix}></ContrastSummary></div>*/}
        {/* 
         <div>
          <div className="see-contrast-heading">
            <InventoryRoundedIcon/>
            <h1 className="big-title">{t('recommendation-section-title')}</h1>
          </div>
          <MockupPage contrastMatrix={contrastMatrix} colorList={colorList}></MockupPage>
          <ContrastSummary contrastMatrix={contrastMatrix}></ContrastSummary>
        </div>
        */}
        <Footer
        backgroundColor="#fcfcfc"
        textColor="#1f1235"  
        text={t('footer-text')}
        />
      </div>
    </div>
  );
}

export default Home;
