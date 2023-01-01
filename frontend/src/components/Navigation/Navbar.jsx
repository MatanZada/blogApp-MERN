import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  //get user from store
  const state = useSelector((state) => state.users);
  // console.log(state);
  const { userAuth } = state;
  // console.log(userAuth);
  const isAdmin = userAuth?.isAdmin;
  // console.log(isAdmin);
  return (
    <>
      {!userAuth ? (
        <PublicNavbar />
      ) : userAuth ? (
        <PrivateNavbar />
      ) : (
        isAdmin && <AdminNavbar />
      )}
    </>
  );
};

export default Navbar;
