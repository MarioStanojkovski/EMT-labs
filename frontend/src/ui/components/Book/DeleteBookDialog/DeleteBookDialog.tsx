import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface DeleteBookDialogProps {
    bookId: number;
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
}

const DeleteBookDialog = ({ bookId, open, onClose, onDelete }: DeleteBookDialogProps) => {
    const handleDelete = async () => {
        await onDelete(bookId);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete this book?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDelete} variant='contained' color='error'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteBookDialog;
