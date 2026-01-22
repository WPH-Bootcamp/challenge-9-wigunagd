import { apiAxios } from '../../services/api/apiAxios';
import type { ILoginBody } from './authType';

export const loginApi = async ({ email, password }: ILoginBody) => {
    const response = await apiAxios.post("/api/auth/login", {
        email: email, 
        password: password
    });

    return response.data;
}