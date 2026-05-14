import useBooks from '../../../hooks/useBooks.ts';
import useWishList from '../../../hooks/useWishList.ts';
import { Alert, Box, Button, CircularProgress, Snackbar } from '@mui/material';
import BookGrid from '../../components/Book/BookGrid/BookGrid.tsx';
import { useState } from 'react';
import AddBookDialog from '../../components/Book/AddBookDialog/AddBookDialog.tsx';
import type { BookFormData } from '../../../api/types/book.ts';
import useAuth from '../../../hooks/useAuth.ts';

const BooksPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const { books, loading, onAdd, onEdit, onDelete } = useBooks();
    const { onAddBook } = useWishList();

    const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const handleAdd = async (data: BookFormData) => {
        try {
            await onAdd(data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to add book.'
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
                            Add Book
                        </Button>
                    </Box>
                    )}
                    <BookGrid books={books} onEdit={onEdit} onDelete={onDelete} onAddToCart={onAddBook} />
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
                    <AddBookDialog
                        open={addDialogOpen}
                        onClose={() => setAddDialogOpen(false)}
                        onAdd={handleAdd}
                    />
                </>}
        </Box>
    );
};

export default BooksPage;
