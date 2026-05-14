import { Alert, Box, Button, Card, CardActions, CardContent, Chip, Snackbar, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { Book, BookFormData } from '../../../../api/types/book.ts';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth.ts';
import EditBookDialog from '../EditBookDialog/EditBookDialog.tsx';
import DeleteBookDialog from '../DeleteBookDialog/DeleteBookDialog.tsx';

interface BookCardProps {
    book: Book;
    onEdit: (id: number, data: BookFormData) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    onAddToCart?: (id: number) => Promise<void>;
}

const BookCard = ({ book, onEdit, onDelete, onAddToCart }: BookCardProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const handleEdit = async (id: number, data: BookFormData) => {
        try {
            await onEdit(id, data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to edit book.'
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await onDelete(id);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to delete book.'
            });
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5'>{book.name}</Typography>
                    <Typography variant='subtitle1' color='text.secondary'>{book.authorName}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip label={book.category} size='small' color='primary' />
                        <Chip
                            label={book.state}
                            size='small'
                            color={book.state === 'GOOD' ? 'success' : 'error'}
                        />
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<InfoIcon />}
                        onClick={() => navigate(`/books/${book.id}`)}
                    >
                        Info
                    </Button>
                    <Box>
                        {onAddToCart && (
                            <Button
                                startIcon={<ShoppingCartIcon />}
                                color='secondary'
                                onClick={() => void onAddToCart(book.id)}
                            >
                                Add
                            </Button>
                        )}
                        {isAdmin && (
                            <>
                                <Button startIcon={<EditIcon />} color='warning' onClick={() => setEditDialogOpen(true)}>Edit</Button>
                                <Button startIcon={<DeleteIcon />} color='error' onClick={() => setDeleteDialogOpen(true)}>Delete</Button>
                            </>
                        )}
                    </Box>
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
            <EditBookDialog
                book={book}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                onEdit={handleEdit}
            />
            <DeleteBookDialog
                bookId={book.id}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onDelete={handleDelete}
            />
        </>
    );
};

export default BookCard;
