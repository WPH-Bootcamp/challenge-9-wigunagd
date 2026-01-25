import { apiAxios } from "@/services/api/apiAxios";
import type { ICheckoutPayloadBody } from "./checkoutType";

export const doCheckout = async ({ restaurants, deliveryAddress, phone, paymentMethod, notes }: ICheckoutPayloadBody) => {
    const response = await apiAxios.post('/api/order/checkout', {
        restaurants: restaurants,
        deliveryAddress: deliveryAddress,
        phone: phone,
        paymentMethod: paymentMethod,
        notes: notes
    });
    return response.data;
}