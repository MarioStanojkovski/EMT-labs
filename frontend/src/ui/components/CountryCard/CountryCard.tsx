import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import { Link } from 'react-router';
import type { Country } from '../../../api/types/country.ts';

interface Props {
    country: Country;
}

const CountryCard = ({ country }: Props) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea component={Link} to={`/countries/${country.id}`} sx={{ height: '100%' }}>
                <CardContent>
                    <Typography variant='h6'>{country.name}</Typography>
                    <Typography variant='body2' color='text.secondary'>{country.continent}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CountryCard;