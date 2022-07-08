import "./mockupPage.css";
import React, { useState, useEffect } from "react";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import { getContrastList } from "../../contrast-calculations";
import { UndrawBrainstorming } from "react-undraw-illustrations";

const MockupPage = ({ contrastMatrix, colorList }) => {
  const [navActive, setNavActive] = useState(false);
  const [allColorCombos, setAllColorCombos] = useState(
    getContrastList(contrastMatrix, 1.0, 21)
  );
  const [degreesPerColor, setDegreesPerColor]= useState(360/colorList.length);

  useEffect(() => {
    setAllColorCombos(getContrastList(contrastMatrix, 1.0, 21.0));
  }, [contrastMatrix]);

  useEffect(() => {
    setDegreesPerColor(360/colorList.length)
  }, [colorList]);

  const getColor1FromCombo = (comboNumber) => {
    return allColorCombos.length > 1 ? allColorCombos[comboNumber].farge1 : "#ffffff";
  };

  const getColor2FromCombo = (comboNumber) => {
    return allColorCombos.length > 1 ? allColorCombos[comboNumber].farge2 : "#000000";
  };

  /*useEffect(() => {
      console.log("nav active", navActive)
      console.log("color lists", colorList)
    },[navActive]) */ 

/*TODO FIKS DENNE! */
const getcolors = () => {
  let string = "conic-gradient("
  for(let color in colorList){
    console.log(color)
    string = string + colorList[color] + " 0 " + degreesPerColor + "deg ";
  } 
  string = string + ")"
  console.log("returning colors", string)
  console.log("sammenlikn med conic-gradient(pink 70deg, lightblue 0 235deg, orange 0)")
  return "conic-gradient(pink 70deg, lightblue 0 235deg, orange 0)"
  //return string
}

  return (
    <div className="mockupPage" style={{
      backgroundColor: colorList[3],
    }}>
      <div 
      onMouseEnter={() => setNavActive(true)}
      onMouseLeave={() => setNavActive(false)}
      className={navActive ? "active" : ""}
      >
        <NavBar
          className="mockupNav" 
          title="mockup website"
          backgroundColor={colorList[0]}
          textColor={colorList[1]}
          topFixed={false}
        ></NavBar>
      </div>
      <div className="mockupRow">
        <div className="rowItem-50 textBox">
          <h1
            style={{
              color: colorList[0],
              fontSize: "14px"
            }}
          >
            En typisk coorporate webside
          </h1>
          <p
            className="helloP"
            style={{
              color: colorList[0],
            }}
          >
            Virker foreløpig bare på de to første fargene. Viser deg hvordan
            fargene dine påvirker lesbarhet og design!
          </p>
        </div>
        <div className="rowItem-50">
          <UndrawBrainstorming
            primaryColor={colorList[2]}
            secondaryColor={colorList[0]}
            accentColor={colorList[4]}
            height="80%"
          />
        </div>
      </div>
      <div className="mocupRow">
        <div className="rowItem-50">
          <form
            className="mockupForm"
            style={{
              backgroundColor: colorList[4],
            }}
          >
            <h1 style={{
              color: colorList[0],
              fontSize: "14px"
            }}>test form</h1>
            <div>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1" style={{
              color: colorList[0],   fontSize: "12px"
            }}> Jeg har en katt</label>
            </div>
            <div>
              {" "}
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1" style={{
              color: colorList[0], fontSize: "12px"
            }}> Jeg er fornøyd</label>
            </div>
          </form>
        </div>
        <div className="rowItem-50">
          <div class="piechart" style={{backgroundImage: getcolors()}}></div>
        </div>
      </div>
      <Footer
        backgroundColor={getColor1FromCombo(0)}
        textColor={getColor2FromCombo(0)}
        text={"this is a footer text"}
      />
    </div>
  );
};

export default MockupPage;
