import axiosInstance from '../axios/axios.ts';
import type { WishList } from './types/wishList.ts';

const wishListApi = {
    getWishList: () => axiosInstance.get<WishList>('/api/wishlist'),
    addBook: (bookId: number) => axiosInstance.post<WishList>(`/api/wishlist/add/${bookId}`),
    removeBook: (bookId: number) => axiosInstance.delete<WishList>(`/api/wishlist/remove/${bookId}`),
    checkout: () => axiosInstance.post<WishList>('/api/wishlist/checkout'),
};

export default wishListApi;
