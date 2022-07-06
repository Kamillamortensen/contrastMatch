import "./mockupPage.css";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/navBar/navBar";
import { getContrastList } from "../../contrast-calculations";

const MockupPage = ({ contrastMatrix }) => {
  const [allColorCombos, setAllColorCombos] = useState(
    getContrastList(contrastMatrix, 1.0, 21)
  );

  useEffect(() => {
    setAllColorCombos(getContrastList(contrastMatrix, 1.0, 21.0));
  }, [contrastMatrix]);

  const getColor1 = () => {
    console.log(
      "color 1",
      allColorCombos.length > 0 ? allColorCombos[0].farge1 : "#ffffff"
    );
    return allColorCombos.length > 0 ? allColorCombos[0].farge1 : "#ffffff";
  };

  const getColor2 = () => {
    return allColorCombos.length > 0 ? allColorCombos[0].farge2 : "#000000";
  };

  return (
    <div className="mockupPage">
      <NavBar
        title="mockup website"
        backgroundColor={getColor1()}
        textColor={getColor2()}
        topFixed={false}
      ></NavBar>
      <div className="helloBlock">
        <div className="helloItem">
          <h1
            style={{
              color: getColor1(),
            }}
          >
            En typisk coorporate webside
          </h1>
          <p
            className="helloP"
            style={{
              color: getColor1(),
            }}
          >
            Viser deg hvordan fargene dine påvirker lesbarhet og design!
          </p>
        </div>
        <div className="helloItem"></div>
      </div>
    </div>
  );
};

export default MockupPage;
