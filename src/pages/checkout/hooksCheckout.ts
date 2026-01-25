import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doCheckout } from "./apiCheckout";
import type { ICheckoutPayloadBody, ICheckoutResponse } from "./checkoutType";
import type { AxiosError } from "axios";

export const useDoCheckout = () => {
    const queryClient = useQueryClient();
    return useMutation<ICheckoutResponse, AxiosError, ICheckoutPayloadBody>({
        mutationFn: (body) => doCheckout(body),
        onSuccess: (response: ICheckoutResponse) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            console.log(response);
        },
        onError: (e) =>{
            console.log(e, 'response checkout')
        }
    });
}