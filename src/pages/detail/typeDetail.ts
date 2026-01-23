// type untuk detail restaurant

export interface IDetailParams{
  id: string;
  limitMenu?: number;
  limitReview?: number
}

export interface Coordinates {
  lat: number;
  long: number;
}

export interface Menu {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
}

export interface RestaurantDetail {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: Coordinates;
  distance: number;
  logo: string;
  images: string[];
  category: string;
  totalMenus: number;
  totalReviews: number;
  menus: Menu[];
}

export interface RestaurantDetailResponse {
  success: boolean;
  data: RestaurantDetail;
}
// type untuk detail restaurant

// type untuk review
export interface PaginationReview {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ReviewUser {
  id: number;
  name: string;
  avatar: string | null;
}

export interface PurchasedMenu {
  menuId: number;
  menuName: string;
  price: number;
  type: 'food' | 'drink' | string;
  image: string;
  quantity: number;
}

export interface TransactionReview {
  id: number;
  star: number;
  comment: string;
  transactionId: string;
  createdAt: string; // ISO Date String
  user: ReviewUser;
  menus: PurchasedMenu[];
}

export interface ReviewResponse {
  success: boolean;
  data: {
    reviews: TransactionReview[];
    pagination: PaginationReview;
  };
}
// type untuk review