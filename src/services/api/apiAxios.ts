import axios from "axios";
import { store } from "./redux";

export const apiAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

apiAxios.interceptors.request.use((config) => {
    const state = store.getState();
    if(state.auth.isLoggedin){
        config.headers.Authorization = `Bearer ${state.auth.accessToken}`;
        return config;
    }
    return config;
});