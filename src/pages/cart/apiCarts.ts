import { apiAxios } from "@/services/api/apiAxios"
import type { IAddCartItem } from "./typeCart"

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

/* /api/cart/{id} */

export const getCartItems = async () => {
    const response = await apiAxios.get('/api/cart');
    return response.data;
}