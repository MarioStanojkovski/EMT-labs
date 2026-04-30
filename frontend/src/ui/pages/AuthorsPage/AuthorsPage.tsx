import { Container, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { useAuthors } from '../../../hooks/useAuthors.ts';
import AuthorCard from '../../components/AuthorCard/AuthorCard.tsx';

const AuthorsPage = () => {
    const { authors, loading, error } = useAuthors();

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    if (error) return <Alert severity='error'>{error}</Alert>;

    return (
        <Container>
            <Typography variant='h4' gutterBottom>Authors</Typography>
            <Grid container spacing={3}>
                {authors.map(author => (
                    <Grid item xs={12} sm={6} md={4} key={author.id}>
                        <AuthorCard author={author} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AuthorsPage;
