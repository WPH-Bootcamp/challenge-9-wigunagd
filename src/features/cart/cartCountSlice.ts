import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartSummaryCount } from "./cartCountType";

const initialState: ICartSummaryCount = {
    totalItems: 0,
    totalPrice: 0,
    restaurantCount: 0,
    itemsInCart: [],
    cart: []
}

const cartCountSlice = createSlice({
    name: "cart/slice",
    initialState: initialState,
    reducers: {
        loadCartSummary: (state, action: PayloadAction<ICartSummaryCount>) => {
            state.totalItems = action.payload.totalItems;
            state.totalPrice = action.payload.totalPrice;
            state.restaurantCount = action.payload.restaurantCount;
            state.itemsInCart=action.payload.itemsInCart;
            state.cart = action.payload.cart;
        }
    }
});

export const { loadCartSummary } = cartCountSlice.actions;
export const cartCountReducer = cartCountSlice.reducer;