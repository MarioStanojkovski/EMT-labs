import { useState, useEffect, useCallback } from 'react';
import type { WishList } from '../api/types/wishList.ts';
import wishListApi from '../api/wishListApis.ts';

const useWishList = () => {
    const [wishList, setWishList] = useState<WishList>({ books: [] });
    const [loading, setLoading] = useState<boolean>(true);

    const fetchWishList = useCallback(async () => {
        setLoading(true);
        const response = await wishListApi.getWishList();
        setWishList(response.data);
        setLoading(false);
    }, []);

    useEffect(() => {
        void fetchWishList();
    }, [fetchWishList]);

    const onAddBook = useCallback(async (bookId: number) => {
        const response = await wishListApi.addBook(bookId);
        setWishList(response.data);
    }, []);

    const onRemoveBook = useCallback(async (bookId: number) => {
        const response = await wishListApi.removeBook(bookId);
        setWishList(response.data);
    }, []);

    const onCheckout = useCallback(async () => {
        const response = await wishListApi.checkout();
        setWishList(response.data);
    }, []);

    return { wishList, loading, onAddBook, onRemoveBook, onCheckout };
};

export default useWishList;
