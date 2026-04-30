import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
    Container, Typography, CircularProgress, Alert,
    TextField, MenuItem, Button, Box
} from '@mui/material';
import { useBook } from '../../../hooks/useBook.ts';
import { useAuthors } from '../../../hooks/useAuthors.ts';
import bookApi from '../../../api/bookApis.ts';
import type { UpdateBookDto } from '../../../api/types/book.ts';

const CATEGORIES = ['NOVEL', 'THRILER', 'HISTORY', 'FANTASY', 'BIOGRAPHY', 'CLASSICS', 'DRAMA'];
const STATES = ['GOOD', 'BAD'];

const EditBookPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { book, loading, error } = useBook(Number(id));
    const { authors } = useAuthors();

    const [form, setForm] = useState<UpdateBookDto>({
        name: '',
        category: '',
        state: '',
        authorId: 0,
        date_published: null,
    });
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    useEffect(() => {
        if (book) {
            setForm({
                name: book.name,
                category: book.category,
                state: book.state,
                authorId: book.authorId,
                date_published: book.date_published ?? null,
            });
        }
    }, [book]);

    const handleChange = (field: keyof UpdateBookDto, value: string | number | null) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSaveError(null);
        bookApi.update(Number(id), form)
            .then(() => navigate(`/books/${id}`))
            .catch(() => setSaveError('Failed to save changes'))
            .finally(() => setSaving(false));
    };

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    if (error) return <Alert severity='error'>{error}</Alert>;
    if (!book) return <Alert severity='warning'>Book not found</Alert>;

    return (
        <Container maxWidth='sm' sx={{ mt: 4 }}>
            <Typography variant='h5' gutterBottom>Edit Book</Typography>
            {saveError && <Alert severity='error' sx={{ mb: 2 }}>{saveError}</Alert>}
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label='Name'
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    required
                />
                <TextField
                    select
                    label='Category'
                    value={form.category}
                    onChange={e => handleChange('category', e.target.value)}
                    required
                >
                    {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </TextField>
                <TextField
                    select
                    label='State'
                    value={form.state}
                    onChange={e => handleChange('state', e.target.value)}
                    required
                >
                    {STATES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>
                <TextField
                    select
                    label='Author'
                    value={form.authorId}
                    onChange={e => handleChange('authorId', Number(e.target.value))}
                    required
                >
                    {authors.map(a => (
                        <MenuItem key={a.id} value={a.id}>{a.name} {a.surname}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    label='Date Published'
                    type='datetime-local'
                    value={form.date_published ? form.date_published.slice(0, 16) : ''}
                    onChange={e => handleChange('date_published', e.target.value ? e.target.value + ':00' : null)}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button type='submit' variant='contained' disabled={saving}>
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                    <Button variant='outlined' onClick={() => navigate(`/books/${id}`)}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditBookPage;