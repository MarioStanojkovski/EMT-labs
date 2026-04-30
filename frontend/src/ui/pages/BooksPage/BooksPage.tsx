import { Container, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { useBooks } from '../../../hooks/useBooks.ts';
import BookCard from '../../components/BookCard/BookCard.tsx';

const BooksPage = () => {
    const { books, loading, error } = useBooks();

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    if (error) return <Alert severity='error'>{error}</Alert>;

    return (
        <Container>
            <Typography variant='h4' gutterBottom>Books</Typography>
            <Grid container spacing={3}>
                {books.map(book => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BooksPage;
