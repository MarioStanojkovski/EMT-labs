import { Alert, Box, Button, Card, CardActions, CardContent, Snackbar, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Country, CountryFormData } from '../../../../api/types/country.ts';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth.ts';
import EditCountryDialog from '../EditCountryDialog/EditCountryDialog.tsx';
import DeleteCountryDialog from '../DeleteCountryDialog/DeleteCountryDialog.tsx';

interface CountryCardProps {
    country: Country;
    onEdit: (id: number, data: CountryFormData) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const CountryCard = ({ country, onEdit, onDelete }: CountryCardProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const handleEdit = async (id: number, data: CountryFormData) => {
        try {
            await onEdit(id, data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to edit country.'
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await onDelete(id);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to delete country.'
            });
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5'>{country.name}</Typography>
                    <Typography variant='subtitle1' color='text.secondary'>{country.continent}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<InfoIcon />}
                        onClick={() => navigate(`/countries/${country.id}`)}
                    >
                        Info
                    </Button>
                    {isAdmin && (
                    <Box>
                        <Button startIcon={<EditIcon />} color='warning' onClick={() => setEditDialogOpen(true)}>Edit</Button>
                        <Button startIcon={<DeleteIcon />} color='error' onClick={() => setDeleteDialogOpen(true)}>Delete</Button>
                    </Box>
                    )}
                </CardActions>
            </Card>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity='error' onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <EditCountryDialog
                country={country}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                onEdit={handleEdit}
            />
            <DeleteCountryDialog
                countryId={country.id}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onDelete={handleDelete}
            />
        </>
    );
};

export default CountryCard;
