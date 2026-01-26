// request Body
export interface IOrderCheckoutItemBody {
    menuId: number;
    quantity: number;
}

export interface IRestaurantCheckoutOrderBody {
    restaurantId: number;
    items: IOrderCheckoutItemBody[];
}

export interface ICheckoutPayloadBody {
    restaurants: IRestaurantCheckoutOrderBody[];
    deliveryAddress: string;
    phone: string;
    paymentMethod: string;
    notes: string;
}
// request Body

// request response
export interface IPricingCheckoutResponse {
    subtotal: number;
    serviceFee: number;
    deliveryFee: number;
    totalPrice: number;
}

export interface IOrderCheckoutItemResponse {
    menuId: number;
    menuName: string;
    price: number;
    quantity: number;
    itemTotal: number;
}

export interface IRestaurantheckoutGroupResponse {
    restaurant: {
        id: number;
        name: string;
        logo: string;
    };
    items: IOrderCheckoutItemResponse[];
    subtotal: number;
}

export interface ITransactionCheckout {
    id: number;
    transactionId: string;
    paymentMethod: string;
    status: "done" | "pending" | "cancelled"; 
    deliveryAddress: string;
    phone: string;
    pricing: IPricingCheckoutResponse;
    restaurants: IRestaurantheckoutGroupResponse[];
    createdAt: string;
}

export interface ICheckoutResponse {
    success: boolean;
    message: string;
    data: {
        transaction: ITransactionCheckout;
    };
}
// request response