import "./App.css";
import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; //tried HashRouter not BrowserRouter
import Home from "./pages/home/home";
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  return (
    <Suspense>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
