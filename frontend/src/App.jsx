import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import { useSelector } from "react-redux";
import CreatePost from "./components/Post/CreatePost";
import PostsList from "./components/Post/PostsList";
import PostDetails from "./components/Post/PostDetails";

function App({ ...rest }) {
  //check if user is login
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  // userAuth?.isAdmin
  // check if user is admin

  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />

        <Route
          path="/create-post"
          {...rest}
          element={
            userAuth ? <CreatePost {...rest} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/add-category"
          {...rest}
          element={
            userAuth ? <AddNewCategory {...rest} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/category-list"
          {...rest}
          element={
            userAuth ? <CategoryList {...rest} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/update-category/:id"
          {...rest}
          element={
            userAuth ? <UpdateCategory {...rest} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
