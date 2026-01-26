import { apiAxios } from "../../services/api/apiAxios";
import type { IParamGetRestaurantList } from "./typeHome";

export const getRestaurant = async ({ limit, page, location, range, priceMin, priceMax, rating }: IParamGetRestaurantList) => {

    const params: IParamGetRestaurantList = { limit, page, location, range }

    if (location) params.location = location;
    if (priceMin && priceMin > 0) params.priceMin = priceMin;
    if (priceMax && priceMax > 0) params.priceMax = priceMax;
    if (rating) params.rating = rating;

    const response = await apiAxios.get('/api/resto/', { params });
    return response.data;
}