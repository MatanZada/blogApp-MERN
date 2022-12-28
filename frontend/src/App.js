import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
