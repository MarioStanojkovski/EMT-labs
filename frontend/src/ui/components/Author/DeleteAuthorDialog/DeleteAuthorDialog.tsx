import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface DeleteAuthorDialogProps {
    authorId: number;
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
}

const DeleteAuthorDialog = ({ authorId, open, onClose, onDelete }: DeleteAuthorDialogProps) => {
    const handleDelete = async () => {
        await onDelete(authorId);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>Delete Author</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete this author?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDelete} variant='contained' color='error'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAuthorDialog;
