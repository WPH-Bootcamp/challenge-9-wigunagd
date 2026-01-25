import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { IAddCartItem, IAddCartResponse, ICartResponse, IDelCart, IDelCartResponse } from "./typeCart";
import type { AxiosError } from "axios";
import { addCartItem, clearCart, delCart, getCartItems, updateCartItem } from "./apiCarts";
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

export const useDelCart = () => {
    const queryClient = useQueryClient();
    return useMutation<IDelCartResponse, AxiosError, IDelCart>({
        mutationFn: (body) => delCart(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success("Item removed from cart");
        },
        onError: (e) => {
            console.log(e)
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.error("Failed to delete the cart item");
        }
    });
}

export const useClearCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => clearCart(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        }
    });
}

export const useGetCartItems = () => {
    return useQuery<ICartResponse, AxiosError>({
        queryKey: ['cart'],
        queryFn: () => getCartItems()
    });
}