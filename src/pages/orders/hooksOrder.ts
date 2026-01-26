import type { AxiosError } from "axios";
import type { IOrderHistoryResponse, IOrderHistoryResponsePagination, IReviewRequest } from "./typeOrder";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getOrders, sendComment } from "./apiOrders";

export const useGetOrders = (params: IOrderHistoryResponsePagination) => {
    return useInfiniteQuery<IOrderHistoryResponse, AxiosError>({
        initialPageParam: 1,
        queryKey: ['review', params],
        queryFn: ({ pageParam }) => getOrders({ ...params, page: pageParam as number }),
        getNextPageParam: (responseData) => {
            const page = responseData.data.pagination.page ?? 0;
            const totalPages = responseData.data.pagination.totalPages ?? 0;
            return page < totalPages ? page + 1 : undefined;
        }
    });
}

export const useSendComment = () => {
    return useMutation<string, AxiosError, IReviewRequest>({
        mutationFn: (body) => sendComment(body)
    });
}

