import React from "react";
import { Routes, Route } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-category" element={<AddNewCategory />} />
        <Route path="/category-list" element={<CategoryList />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
