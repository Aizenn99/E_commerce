import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin-slice/product-slice";
import shoppingProductsSlice from "./shop-slice/products-slice";

const store = configureStore({
  reducer: {
    shopProducts: shoppingProductsSlice,
    auth: authReducer,
    adminProducts: AdminProductsSlice,
  },
});

export default store;
