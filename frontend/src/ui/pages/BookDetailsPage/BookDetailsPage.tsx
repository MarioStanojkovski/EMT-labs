import { useNavigate, useParams } from 'react-router';
import { Container, Typography, CircularProgress, Alert, Card, CardContent, Chip, Box, Button } from '@mui/material';
import { useBook } from '../../../hooks/useBook.ts';

const BookDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { book, loading, error } = useBook(Number(id));

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    if (error) return <Alert severity='error'>{error}</Alert>;
    if (!book) return <Alert severity='warning'>Book not found</Alert>;

    return (
        <Container maxWidth='sm' sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant='h4'>{book.name}</Typography>
                        <Button variant='outlined' onClick={() => navigate(`/books/${id}/edit`)}>Edit</Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip label={book.category} color='primary' />
                        <Chip label={book.state} color='secondary' />
                    </Box>
                    <Typography variant='body1'><strong>Author:</strong> {book.authorName}</Typography>
                    {book.date_published && (
                        <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                            Published: {new Date(book.date_published).toLocaleDateString()}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default BookDetailsPage;
