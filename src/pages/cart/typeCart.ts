// POST AddCart Item
export interface IAddCartItem {
    restaurantId?: number;
    cartItemId?: number;
    menuId?: number;
    quantity: number;
}
// POST AddCart Item

// GET Item
export interface ICartRestaurant {
    id: number;
    name: string;
    logo: string;
}

export interface ICartMenu {
    id: number;
    foodName: string;
    price: number;
    type: string;
    image: string;
}

export interface ICartItem {
    id: number;
    menu: ICartMenu;
    quantity: number;
    itemTotal: number;
}

export interface ICartGroup {
    restaurant: ICartRestaurant;
    items: ICartItem[];
    subtotal: number;
}

export interface ICartSummary {
    totalItems: number;
    totalPrice: number;
    restaurantCount: number;
}

export interface ICartResponse {
    success: boolean;
    message: string;
    data: {
        cart: ICartGroup[];
        summary: ICartSummary;
    };
}
// GET Item

// response add to cart
export interface IAddCartItemDetail {
    id: number;
    restaurant: ICartRestaurant;
    menu: ICartMenu;
    quantity: number;
    itemTotal: number;
}

export interface IAddCartResponse {
    success: boolean;
    message: string;
    data: {
        cartItem: IAddCartItemDetail;
    };
}

export interface IDelCart {
    id: number | undefined;
}

export interface IDelCartResponse {
    success: boolean;
    message: string;
}
// response add to cart