export interface PriceRange {
    min: number;
    max: number
}

export interface Restaurant {
    id: number;
    name: string;
    place: string;
    logo: string;
    images: string[];
    category: string;
    reviewCount: number;
    menuCount: number;
    priceRange: PriceRange;
    distance: number;
    star: number;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface RestaurantResponse{
    success: boolean;
    data:{
        restaurants: Restaurant[];
        pagination: Pagination;
    }
}

export interface IParamGetRestaurantList {
    location?: string;
    range?: number;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    category?: string;
    limit?: number;
    page?: number;
}