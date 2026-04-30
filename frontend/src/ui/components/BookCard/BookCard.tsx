import { Card, CardContent, CardActionArea, Typography, Chip, Box } from '@mui/material';
import { Link } from 'react-router';
import type { Book } from '../../../api/types/book.ts';

interface Props {
    book: Book;
}

const BookCard = ({ book }: Props) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea component={Link} to={`/books/${book.id}`} sx={{ height: '100%' }}>
                <CardContent>
                    <Typography variant='h6' gutterBottom>{book.name}</Typography>
                    <Typography variant='body2' color='text.secondary' gutterBottom>{book.authorName}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip label={book.category} size='small' color='primary' />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default BookCard;