export interface IOrderPricing {
    subtotal: number;
    serviceFee: number;
    deliveryFee: number;
    totalPrice: number;
}

export interface IOrderItemDetail {
    menuId: number;
    menuName: string;
    price: number;
    image: string;
    quantity: number;
    itemTotal: number;
}

export interface IOrderRestaurant {
    restaurant: {
        id: number;
        name: string;
        logo: string;
    };
    items: IOrderItemDetail[];
    subtotal: number;
}

export interface IOrderHistoryItem {
    id: number;
    transactionId: string;
    status: "done" | "pending" | "cancelled" | "preparing" | "delivered" | "on_the_way";
    paymentMethod: string;
    deliveryAddress: string;
    phone: string;
    pricing: IOrderPricing;
    restaurants: IOrderRestaurant[];
    createdAt: string;
    updatedAt: string;
}

export interface IOrderHistoryResponsePagination {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
}

export interface IOrderHistoryResponse {
    data: {
        orders: IOrderHistoryItem[];
        pagination: IOrderHistoryResponsePagination;
        filter: {
            status: string;
        };
    };
}