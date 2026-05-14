import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import type { Book } from '../../../../api/types/book.ts';

interface ShoppingCartProps {
    books: Book[];
    onRemove: (bookId: number) => Promise<void>;
    onCheckout: () => Promise<void>;
}

const ShoppingCart = ({ books, onRemove, onCheckout }: ShoppingCartProps) => {
    const isEmpty = books.length === 0;

    return (
        <Box sx={{ my: 3, width: 600, mx: 'auto' }}>
            <Card>
                <CardContent>
                    <Typography variant='h5' gutterBottom>
                        My Wish List
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {isEmpty ? (
                        <Typography color='text.secondary' sx={{ py: 2, textAlign: 'center' }}>
                            Your wish list is empty.
                        </Typography>
                    ) : (
                        <List>
                            {books.map((book) => (
                                <ListItem
                                    key={book.id}
                                    secondaryAction={
                                        <IconButton edge='end' color='error' onClick={() => void onRemove(book.id)}>
                                            <Delete />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={book.name}
                                        secondary={
                                            <Box component='span' sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                                <span>{book.authorName}</span>
                                                <Chip label={book.category} size='small' color='primary' />
                                                <Chip
                                                    label={book.state}
                                                    size='small'
                                                    color={book.state === 'GOOD' ? 'success' : 'error'}
                                                />
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant='h6'>Total books: {books.length}</Typography>
                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isEmpty}
                        onClick={() => void onCheckout()}
                    >
                        Checkout
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ShoppingCart;
