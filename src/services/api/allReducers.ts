import { combineReducers } from "@reduxjs/toolkit";
import { authReducerLogin } from "../../features/auth/authSlice";

export const allReducers = combineReducers({
    auth: authReducerLogin
});