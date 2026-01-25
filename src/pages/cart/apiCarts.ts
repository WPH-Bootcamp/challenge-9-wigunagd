import { apiAxios } from "@/services/api/apiAxios"
import type { IAddCartItem, IDelCart } from "./typeCart"

export const addCartItem = async ({ restaurantId, menuId, quantity }: IAddCartItem) => {
    const response = await apiAxios.post('/api/cart', {
        restaurantId: restaurantId,
        menuId: menuId,
        quantity: quantity
    });
    return response.data;
}

export const updateCartItem = async ({ cartItemId, quantity }: IAddCartItem) => {
    const response = await apiAxios.put(`/api/cart/${cartItemId}`, {
        quantity: quantity
    });
    return response.data;
}

export const delCart = async ({ id }: IDelCart) => {
    const response = await apiAxios.delete(`/api/cart/${id}`);
    return response.data;
}

export const clearCart = async () => {
    const response = await apiAxios.delete(`/api/cart`);
    return response.data;
}

export const getCartItems = async () => {
    const response = await apiAxios.get('/api/cart');
    return response.data;
}