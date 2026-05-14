import { useCountry } from '../../../hooks/useCountry.ts';
import { Link, useNavigate, useParams } from 'react-router';
import {
    Box, Breadcrumbs, Button, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const CountryDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { country } = useCountry(Number(id));

    if (!country) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/countries' style={{ textDecoration: 'none', color: 'inherit' }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Countries
                </Link>
                <Typography color='text.primary'>{country.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {country.name}
                            </Typography>
                            <Typography variant='h5' color='text.secondary'>
                                {country.continent}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Stack direction='row' spacing={2}>
                            <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/countries')}>
                                Back to Countries
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CountryDetailsPage;
