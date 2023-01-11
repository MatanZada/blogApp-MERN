import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlices";
import categorysReducer from "../slices/cateegory/categorySlice";
import post from "../slices/posts/postSlices";
import comment from "../slices/comments/commentSlices";
import sendMail from "../slices/email/emailSlices";

const store = configureStore({
  reducer: {
    users: userReducer,
    category: categorysReducer,
    post,
    comment,
    sendMail,
  },
});

export default store;
