import { useEffect, useState } from 'react';
import bookApi from '../api/bookApis.ts';
import type { Book } from '../api/types/book.ts';

export const useBook = (id: number) => {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        bookApi.findById(id)
            .then(res => setBook(res.data))
            .catch(() => setError('Failed to load book'))
            .finally(() => setLoading(false));
    }, [id]);

    return { book, loading, error };
};
