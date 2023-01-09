import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlices";
import categorysReducer from "../slices/cateegory/categorySlice";
import post from "../slices/posts/postSlices";

const store = configureStore({
  reducer: {
    users: userReducer,
    category: categorysReducer,
    post,
  },
});

export default store;
