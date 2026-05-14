import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import type { BookFormData } from '../../../../api/types/book.ts';
import useAuthors from '../../../../hooks/useAuthors.ts';

const CATEGORIES = ['NOVEL', 'THRILER', 'HISTORY', 'FANTASY', 'BIOGRAPHY', 'CLASSICS', 'DRAMA'];
const STATES = ['GOOD', 'BAD'];

interface FormData {
    name: string;
    category: string;
    state: string;
    authorId: string;
    date_published: string;
}

const initialFormData: FormData = {
    name: '',
    category: '',
    state: '',
    authorId: '',
    date_published: ''
};

interface AddBookDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: BookFormData) => Promise<void>;
}

const AddBookDialog = ({ open, onClose, onAdd }: AddBookDialogProps) => {
    const { authors } = useAuthors();
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.category || !formData.state || !formData.authorId) return;

        const payload: BookFormData = {
            name: formData.name.trim(),
            category: formData.category,
            state: formData.state,
            authorId: Number(formData.authorId),
            date_published: formData.date_published ? formData.date_published + ':00' : null
        };
        await onAdd(payload);
        setFormData({ ...initialFormData });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Book</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl margin='dense' fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label='Category' name='category' value={formData.category} onChange={handleChange} variant='outlined'>
                        {CATEGORIES.map((c) => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin='dense' fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select label='State' name='state' value={formData.state} onChange={handleChange} variant='outlined'>
                        {STATES.map((s) => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin='dense' fullWidth>
                    <InputLabel>Author</InputLabel>
                    <Select label='Author' name='authorId' value={formData.authorId} onChange={handleChange} variant='outlined'>
                        {authors.map((author) => (
                            <MenuItem key={author.id} value={author.id.toString()}>{author.name} {author.surname}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin='dense'
                    label='Date Published'
                    name='date_published'
                    type='datetime-local'
                    value={formData.date_published}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant='contained' color='primary'>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookDialog;
