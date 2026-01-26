import { apiAxios } from "@/services/api/apiAxios";
import type { IOrderHistoryResponsePagination, IReviewRequest } from "./typeOrder";

export const getOrders = async ({ limit, page }: IOrderHistoryResponsePagination) => {
    const response = await apiAxios.get(`/api/order/my-order`, {
        params: {
            limit: limit,
            page: page
        }
    });

    return response.data;
}

export const sendComment = async ({ transactionId, restaurantId, star, comment, menuIds }: IReviewRequest) => {
    const response = await apiAxios.post('/api/review', {
        transactionId: transactionId, 
        restaurantId: restaurantId, 
        star: star, 
        comment: comment, 
        menuIds: menuIds
    });
    return response.data;
}