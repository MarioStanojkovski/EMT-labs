import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface DeleteCountryDialogProps {
    countryId: number;
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
}

const DeleteCountryDialog = ({ countryId, open, onClose, onDelete }: DeleteCountryDialogProps) => {
    const handleDelete = async () => {
        await onDelete(countryId);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>Delete Country</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete this country?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDelete} variant='contained' color='error'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCountryDialog;
