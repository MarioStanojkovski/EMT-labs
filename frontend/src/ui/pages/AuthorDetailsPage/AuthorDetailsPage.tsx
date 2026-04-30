import { useParams } from 'react-router';
import { Container, Typography, CircularProgress, Alert, Card, CardContent } from '@mui/material';
import { useAuthor } from '../../../hooks/useAuthor.ts';

const AuthorDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { author, loading, error } = useAuthor(Number(id));

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    if (error) return <Alert severity='error'>{error}</Alert>;
    if (!author) return <Alert severity='warning'>Author not found</Alert>;

    return (
        <Container maxWidth='sm' sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant='h4' gutterBottom>{author.name} {author.surname}</Typography>
                    <Typography variant='body1'><strong>Country:</strong> {author.countryName}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AuthorDetailsPage;
