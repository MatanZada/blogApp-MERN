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
import UpdatePost from "./components/Post/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import UsersList from "./components/Users/UsersList/UsersList";
import UpdatePassword from "./components/Users/PasswordManagement/UpdatePassword";
import ResetPasswordForm from "./components/Users/PasswordManagement/ResetPasswordForm";

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
          path="/update-comment/:id"
          {...rest}
          element={
            userAuth ? <UpdateComment {...rest} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/users"
          {...rest}
          element={
            userAuth?.isAdmin ? (
              <UsersList {...rest} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/update-password"
          {...rest}
          element={
            userAuth ? <UpdatePassword {...rest} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/password-reset-token"
          {...rest}
          element={<ResetPasswordForm {...rest} />}
        />

        <Route
          path="/upload-profile-photo"
          {...rest}
          element={
            userAuth ? (
              <UploadProfilePhoto {...rest} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/update-profile/:id"
          {...rest}
          element={
            userAuth ? (
              <UpdateProfileForm {...rest} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile/:id"
          {...rest}
          element={userAuth ? <Profile {...rest} /> : <Navigate to="/login" />}
        />

        <Route
          path="/create-post"
          {...rest}
          element={
            userAuth ? <CreatePost {...rest} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/update-post/:id"
          {...rest}
          element={
            userAuth ? <UpdatePost {...rest} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/add-category"
          {...rest}
          element={
            userAuth?.isAdmin ? (
              <AddNewCategory {...rest} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/category-list"
          {...rest}
          element={
            userAuth?.isAdmin ? (
              <CategoryList {...rest} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/update-category/:id"
          {...rest}
          element={
            userAuth?.isAdmin ? (
              <UpdateCategory {...rest} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
