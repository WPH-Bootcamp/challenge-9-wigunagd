import { apiAxios } from '../../services/api/apiAxios';
import type { IRegisterBody } from './authType';

export const registerApi = async ({ name, email, phone, password }: IRegisterBody) => {
    const response = await apiAxios.post("/api/auth/register", {
        name: name, 
        email: email, 
        phone: phone, 
        password: password
    });

    return response.data;
}