import useCountries from '../../../hooks/useCountries.ts';
import { Alert, Box, Button, CircularProgress, Snackbar } from '@mui/material';
import CountryGrid from '../../components/Country/CountryGrid/CountryGrid.tsx';
import { useState } from 'react';
import AddCountryDialog from '../../components/Country/AddCountryDialog/AddCountryDialog.tsx';
import type { CountryFormData } from '../../../api/types/country.ts';
import useAuth from '../../../hooks/useAuth.ts';

const CountriesPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const { countries, loading, onAdd, onEdit, onDelete } = useCountries();

    const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const handleAdd = async (data: CountryFormData) => {
        try {
            await onAdd(data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to add country.'
            });
        }
    };

    return (
        <Box>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {!loading &&
                <>
                    {isAdmin && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button variant='contained' color='primary' onClick={() => setAddDialogOpen(true)}>
                            Add Country
                        </Button>
                    </Box>
                    )}
                    <CountryGrid countries={countries} onEdit={onEdit} onDelete={onDelete} />
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
                    <AddCountryDialog
                        open={addDialogOpen}
                        onClose={() => setAddDialogOpen(false)}
                        onAdd={handleAdd}
                    />
                </>}
        </Box>
    );
};

export default CountriesPage;
