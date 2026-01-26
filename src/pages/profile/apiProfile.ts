import { apiAxios } from "@/services/api/apiAxios";

export const getProfile = async () => {
    const response = await apiAxios.get('/api/auth/profile');
    return response.data;
};