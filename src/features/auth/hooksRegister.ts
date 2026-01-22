import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { IRegisterBody } from "./authType";
import { registerApi } from "./apiRegister";


export const useRegister = () => {

    return useMutation<string, AxiosError, IRegisterBody>({
        mutationFn: (body) => registerApi(body),
        /* onSuccess: () => {
        },
        onError: () => {
        } */

        // on success dan on error dipass ke LoginPage.tsx
    });
};