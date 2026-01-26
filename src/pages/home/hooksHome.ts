import { useInfiniteQuery } from "@tanstack/react-query";
import type { IParamGetRestaurantList, RestaurantResponse } from "./typeHome";
import type { AxiosError } from "axios";
import { getRestaurant } from "./apiHome";

export const useGetRestaurant = (params: IParamGetRestaurantList) => {
    return useInfiniteQuery<RestaurantResponse, AxiosError>({
        initialPageParam: 1,
        queryKey:['restaurant', params],
        queryFn: ({pageParam}) => getRestaurant({...params, page: pageParam as number}),
        getNextPageParam: (responseData) => {
            const page = responseData.data.pagination.page ?? 0;
            const totalPages = responseData.data.pagination.totalPages ?? 0;
            return page < totalPages ? page + 1 : undefined;
        }
    });
}