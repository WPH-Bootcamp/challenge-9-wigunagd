import { apiAxios } from "@/services/api/apiAxios"
import type { IDetailParams } from "./typeDetail";
import type { ReviewPagination } from "./typeDetail";

// detail & menu
export const getDetail = async ({id, limitReview}: IDetailParams) => {
    const response = await apiAxios.get(`/api/resto/${id}`, {
        params:{
            limitReview: limitReview
        }
    });
    return response.data;
}
// detail & menu

// review
export const getReview = async ({limit, page, id}: ReviewPagination) => {
    const response = await apiAxios.get(`/api/review/restaurant/${id}`, {
        params: {
            limit: limit,
            page: page
        }
    });

    return response.data;
}
// review