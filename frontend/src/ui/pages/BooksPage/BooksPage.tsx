import { useState, useEffect } from 'react';
import {
    Container, Grid, Typography, CircularProgress, Alert,
    Button, FormControl, InputLabel, Select, MenuItem, Box
} from '@mui/material';
import { useBooks } from '../../../hooks/useBooks.ts';
import BookCard from '../../components/BookCard/BookCard.tsx';
import bookApi from '../../../api/bookApis.ts';

const BooksPage = () => {
    const [states, setStates] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>('');
    const [stateFilter, setStateFilter] = useState<string | undefined>(undefined);
    const { books, loading, error } = useBooks(stateFilter);

    useEffect(() => {
        bookApi.getStates().then(res => setStates(res.data));
    }, []);

    const handleSearch = () => {
        setStateFilter(selected || undefined);
    };

    if (error) return <Alert severity='error'>{error}</Alert>;

    return (
        <Container>
            <Typography variant='h4' gutterBottom>Books</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                <FormControl size='small' sx={{ minWidth: 160 }}>
                    <InputLabel>State</InputLabel>
                    <Select
                        value={selected}
                        label='State'
                        onChange={e => setSelected(e.target.value)}
                    >
                        <MenuItem value=''>All</MenuItem>
                        {states.map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant='contained' onClick={handleSearch}>Search</Button>
            </Box>
            {loading ? (
                <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
            ) : (
                <Grid container spacing={3}>
                    {books.map(book => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                            <BookCard book={book} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default BooksPage;
