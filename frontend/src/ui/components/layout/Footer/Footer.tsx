import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component='footer' sx={{ py: 3, mt: 'auto', backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>
            <Typography variant='body2'>© {new Date().getFullYear()} E-Book-SHOP</Typography>
        </Box>
    );
};

export default Footer;