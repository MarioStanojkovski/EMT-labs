import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import * as React from 'react';
import type { Book, BookFormData } from '../../../../api/types/book.ts';
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

interface EditBookDialogProps {
    book: Book;
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: BookFormData) => Promise<void>;
}

const EditBookDialog = ({ book, open, onClose, onEdit }: EditBookDialogProps) => {
    const { authors } = useAuthors();

    const [formData, setFormData] = useState<FormData>({
        name: book.name,
        category: book.category,
        state: book.state,
        authorId: book.authorId?.toString() ?? '',
        date_published: book.date_published ?? ''
    });

    useEffect(() => {
        if (open) {
            setFormData({
                name: book.name,
                category: book.category,
                state: book.state,
                authorId: book.authorId?.toString() ?? '',
                date_published: book.date_published ?? ''
            });
        }
    }, [open, book]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const payload: BookFormData = {
            name: formData.name.trim(),
            category: formData.category,
            state: formData.state,
            authorId: Number(formData.authorId),
            date_published: formData.date_published ? formData.date_published.substring(0, 16) + ':00' : null
        };
        await onEdit(book.id, payload);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Edit Book</DialogTitle>
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
                <Button onClick={handleSubmit} variant='contained' color='warning'>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBookDialog;
