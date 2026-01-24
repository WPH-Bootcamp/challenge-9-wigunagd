import { combineReducers } from "@reduxjs/toolkit";
import { authReducerLogin } from "../../features/auth/authSlice";
import { cartCountReducer } from "@/features/cart/cartCountSlice";

export const allReducers = combineReducers({
    auth: authReducerLogin,
    cartCount: cartCountReducer,
});