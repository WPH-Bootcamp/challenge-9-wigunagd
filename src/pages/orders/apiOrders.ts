import { apiAxios } from "@/services/api/apiAxios";
import type { IOrderHistoryResponsePagination } from "./typeOrder";

export const getOrders = async ({limit, page}: IOrderHistoryResponsePagination) => {
    const response = await apiAxios.get(`/api/order/my-order`, {
        params: {
            limit: limit,
            page: page
        }
    });

    return response.data;
}