import { Container, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { useCountries } from '../../../hooks/useCountries.ts';
import CountryCard from '../../components/CountryCard/CountryCard.tsx';

const CountriesPage = () => {
    const { countries, loading, error } = useCountries();

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    if (error) return <Alert severity='error'>{error}</Alert>;

    return (
        <Container>
            <Typography variant='h4' gutterBottom>Countries</Typography>
            <Grid container spacing={3}>
                {countries.map(country => (
                    <Grid item xs={12} sm={6} md={4} key={country.id}>
                        <CountryCard country={country} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CountriesPage;
