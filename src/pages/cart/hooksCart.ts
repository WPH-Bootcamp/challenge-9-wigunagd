import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { IAddCartItem, IAddCartResponse, ICartResponse } from "./typeCart";
import type { AxiosError } from "axios";
import { addCartItem, getCartItems, updateCartItem } from "./apiCarts";
import { toast } from "sonner";

export const useAddCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation<IAddCartResponse, AxiosError, IAddCartItem>({
        mutationFn: (body) => addCartItem(body),
        onSuccess: (response: IAddCartResponse) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });

            toast.success(`${response.data.cartItem.menu.foodName} added`);
        }
    });
}

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation<IAddCartResponse, AxiosError, IAddCartItem>({
        mutationFn: (body) => updateCartItem(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.error("Failed to update the cart");
        }
    });
}

export const useGetCartItems = () => {
    return useQuery<ICartResponse, AxiosError>({
        queryKey: ['cart'],
        queryFn: () => getCartItems()
    });
}