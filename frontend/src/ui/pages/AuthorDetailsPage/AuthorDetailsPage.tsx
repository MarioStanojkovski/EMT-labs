import { useAuthor } from '../../../hooks/useAuthor.ts';
import { Link, useNavigate, useParams } from 'react-router';
import {
    Avatar, Box, Breadcrumbs, Button, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const AuthorDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { author } = useAuthor(Number(id));

    if (!author) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/authors' style={{ textDecoration: 'none', color: 'inherit' }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Authors
                </Link>
                <Typography color='text.primary'>{author.name} {author.surname}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                            bgcolor: 'background.paper',
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 1
                        }}>
                            <Avatar
                                variant='rounded'
                                sx={{ width: '100%', height: 'auto' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {author.name} {author.surname}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Stack direction='row' spacing={2}>
                            <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/authors')}>
                                Back to Authors
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AuthorDetailsPage;
