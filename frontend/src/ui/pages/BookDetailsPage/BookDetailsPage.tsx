import { useBook } from '../../../hooks/useBook.ts';
import { Link, useNavigate, useParams } from 'react-router';
import {
    Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const BookDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { book } = useBook(Number(id));

    if (!book) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/books' style={{ textDecoration: 'none', color: 'inherit' }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Books
                </Link>
                <Typography color='text.primary'>{book.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {book.name}
                            </Typography>
                            <Typography variant='h6' color='text.secondary' sx={{ mb: 2 }}>
                                {book.authorName}
                            </Typography>
                            <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
                                <Chip label={book.category} color='primary' variant='outlined' />
                                <Chip
                                    label={book.state}
                                    color={book.state === 'GOOD' ? 'success' : 'error'}
                                    variant='outlined'
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Stack direction='row' spacing={2}>
                            <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/books')}>
                                Back to Books
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default BookDetailsPage;
