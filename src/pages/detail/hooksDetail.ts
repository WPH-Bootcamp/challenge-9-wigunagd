import { useQuery } from "@tanstack/react-query";
import type { IDetailParams, RestaurantDetailResponse } from "./typeDetail";
import type { AxiosError } from "axios";
import { getDetail } from "./apiDetail";

export const useGetDetail = (params: IDetailParams) => {
    return useQuery<RestaurantDetailResponse, AxiosError>({
        queryKey:['detail'],
        queryFn: () => getDetail(params)
    });
}