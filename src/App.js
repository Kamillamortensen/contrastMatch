import "./App.css";
import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; //tried HashRouter not BrowserRouter
import Home from "./pages/home/home";
import About from "./pages/about/About";
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  return (
    <Suspense>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
