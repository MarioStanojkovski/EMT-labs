import { Box, CircularProgress } from '@mui/material';
import useWishList from '../../../hooks/useWishList.ts';
import ShoppingCart from '../../components/WishList/ShoppingCart/ShoppingCart.tsx';

const WishListPage = () => {
    const { wishList, loading, onRemoveBook, onCheckout } = useWishList();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <ShoppingCart
            books={wishList.books}
            onRemove={onRemoveBook}
            onCheckout={onCheckout}
        />
    );
};

export default WishListPage;
