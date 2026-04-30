import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import { Link } from 'react-router';
import type { Author } from '../../../api/types/author.ts';

interface Props {
    author: Author;
}

const AuthorCard = ({ author }: Props) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea component={Link} to={`/authors/${author.id}`} sx={{ height: '100%' }}>
                <CardContent>
                    <Typography variant='h6'>{author.name} {author.surname}</Typography>
                    <Typography variant='body2' color='text.secondary'>{author.countryName}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default AuthorCard;