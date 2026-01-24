import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { IDetailParams, RestaurantDetailResponse, ReviewPagination, ReviewResponse } from "./typeDetail";
import type { AxiosError } from "axios";
import { getDetail, getReview } from "./apiDetail";

// detail & menu
export const useGetDetail = (params: IDetailParams) => {
    return useQuery<RestaurantDetailResponse, AxiosError>({
        queryKey: ['detail'],
        queryFn: () => getDetail(params)
    });
}
// detail & menu

// review
export const useGetReview = (params: ReviewPagination) => {
    return useInfiniteQuery<ReviewResponse, AxiosError>({
        initialPageParam: 1,
        queryKey: ['review', params],
        queryFn: ({ pageParam }) => getReview({ ...params, page: pageParam as number }),
        getNextPageParam: (responseData) => {
            //return (responseData.data.pagination.page ?? 1) + 1;
            // ;
            const page = responseData.data.pagination.page ?? 0;
            const totalPages = responseData.data.pagination.totalPages ?? 0;
            return page < totalPages ? page + 1 : undefined;
        }
    });
}
// review