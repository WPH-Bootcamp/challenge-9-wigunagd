import { apiAxios } from "../../services/api/apiAxios";
import type { IParamGetRestaurantList } from "./typeHome";

export const getRestaurant = async ({ limit, page, location, range }: IParamGetRestaurantList) => {
    const response = await apiAxios.get('/api/resto/', {
        params: {
            limit: limit,
            page: page,
            location: location,
            range: range
        }
    });
    return response.data;
}