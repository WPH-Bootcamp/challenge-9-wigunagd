import { apiAxios } from "@/services/api/apiAxios"
import type { IDetailParams } from "./typeDetail";

export const getDetail = async ({id, limitReview}: IDetailParams) => {
    const response = await apiAxios.get(`/api/resto/${id}`, {
        params:{
            limitReview: limitReview
        }
    });
    return response.data;
}