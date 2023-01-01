import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlices";
import categorysReducer from "../slices/cateegory/categorySlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    category: categorysReducer,
  },
});

export default store;
