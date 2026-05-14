import useAuthors from '../../../hooks/useAuthors.ts';
import { Alert, Box, Button, CircularProgress, Snackbar } from '@mui/material';
import AuthorGrid from '../../components/Author/AuthorGrid/AuthorGrid.tsx';
import { useState } from 'react';
import AddAuthorDialog from '../../components/Author/AddAuthorDialog/AddAuthorDialog.tsx';
import type { AuthorFormData } from '../../../api/types/author.ts';
import useAuth from '../../../hooks/useAuth.ts';

const AuthorsPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const { authors, loading, onAdd, onEdit, onDelete } = useAuthors();

    const [addAuthorDialogOpen, setAddAuthorDialogOpen] = useState<boolean>(false);

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const handleAdd = async (data: AuthorFormData) => {
        try {
            await onAdd(data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to add author.'
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
                        <Button variant='contained' color='primary' onClick={() => setAddAuthorDialogOpen(true)}>
                            Add Author
                        </Button>
                    </Box>
                    )}
                    <AuthorGrid authors={authors} onEdit={onEdit} onDelete={onDelete} />
                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={3000}
                        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                        <Alert
                            severity='error'
                            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                    <AddAuthorDialog
                        open={addAuthorDialogOpen}
                        onClose={() => setAddAuthorDialogOpen(false)}
                        onAdd={handleAdd}
                    />
                </>}
        </Box>
    );
};

export default AuthorsPage;
