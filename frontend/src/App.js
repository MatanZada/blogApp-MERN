import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
