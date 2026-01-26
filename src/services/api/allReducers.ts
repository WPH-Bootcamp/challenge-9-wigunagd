import { combineReducers, type AnyAction } from "@reduxjs/toolkit";
import { authReducerLogin } from "../../features/auth/authSlice";
import { cartCountReducer } from "@/features/cart/cartCountSlice";
import storage from 'redux-persist/lib/storage';

export const allReducers = combineReducers({
    auth: authReducerLogin,
    cartCount: cartCountReducer,
});

export const rootReducer = (state: ReturnType<typeof allReducers> | undefined, action: AnyAction) => {
    if (action.type === "auth/logout") {
        state = undefined;
        storage.removeItem('persist:restaurant'); 
    }
    return allReducers(state, action);
};