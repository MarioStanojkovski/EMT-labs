import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router';

const HomePage = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant='h3' gutterBottom>Welcome to E-Book-SHOP</Typography>
            <Typography variant='h6' color='text.secondary' gutterBottom>
                Browse our collection of books, authors and countries
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant='contained' component={Link} to='/books'>Browse Books</Button>
                <Button variant='outlined' component={Link} to='/authors'>Authors</Button>
                <Button variant='outlined' component={Link} to='/countries'>Countries</Button>
            </Box>
        </Box>
    );
};

export default HomePage;
