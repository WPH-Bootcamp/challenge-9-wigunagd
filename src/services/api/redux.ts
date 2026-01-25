import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import { rootReducer } from '../api/allReducers';

const config = {
    key: "restaurant",
    storage: storage
};

const persistedReducer = persistReducer(config, rootReducer);

export const store = configureStore({
    reducer: persistedReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger)
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();