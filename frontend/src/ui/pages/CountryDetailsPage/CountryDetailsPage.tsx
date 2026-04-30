import { useParams } from 'react-router';
import { Container, Typography, CircularProgress, Alert, Card, CardContent } from '@mui/material';
import { useCountry } from '../../../hooks/useCountry.ts';

const CountryDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { country, loading, error } = useCountry(Number(id));

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    if (error) return <Alert severity='error'>{error}</Alert>;
    if (!country) return <Alert severity='warning'>Country not found</Alert>;

    return (
        <Container maxWidth='sm' sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant='h4' gutterBottom>{country.name}</Typography>
                    <Typography variant='body1'><strong>Continent:</strong> {country.continent}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CountryDetailsPage;
