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

export const orderStatusArr = [
    { display: "Preparing", value: "preparing" },
    { display: "Pending", value: "pending" },
    { display: "On The Way", value: "on_the_way" },
    { display: "Delivered", value: "delivered" },
    { display: "Done", value: "done" },
    { display: "Cancelled", value: "cancelled" },
] as const;

type TOrderStatus = typeof orderStatusArr[number]["value"];

export interface IOrderHistoryItem {
    id: number;
    transactionId: string;
    status: TOrderStatus;
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

// Review
export interface IReviewRequest {
    transactionId: string;
    restaurantId: number;
    star: number;
    comment: string;
    menuIds: number[];
}