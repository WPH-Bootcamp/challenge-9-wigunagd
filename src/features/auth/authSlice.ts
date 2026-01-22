import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { IAuthState, ILoginData } from './authType';

const initialState: IAuthState = {
    isLoggedin: false,
    userName: "",
    avatar: "",
    accessToken: ""
}

const authSliceLogin = createSlice({
    name: "auth/slice",
    initialState: initialState,
    reducers: {
        onSuccessLogin: (state, action: PayloadAction<ILoginData>) => {
            state.isLoggedin = true;
            state.userName=action.payload.user.name;
            state.avatar=action.payload.user.avatar;
            state.accessToken = action.payload?.token;
        },
    }
});

export const { onSuccessLogin } = authSliceLogin.actions;
export const authReducerLogin = authSliceLogin.reducer;