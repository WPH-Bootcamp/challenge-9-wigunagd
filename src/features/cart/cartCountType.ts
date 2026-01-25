import type { ICartGroup } from "@/pages/cart/typeCart";

export interface ItemsInCart {
    id: number;
    menu : {
        id: number;
    },
    quantity: number;
}

export interface ICartSummaryCount {
    totalItems: number;
    totalPrice: number;
    restaurantCount: number;
    itemsInCart: ItemsInCart[];
    cart: ICartGroup[]
}