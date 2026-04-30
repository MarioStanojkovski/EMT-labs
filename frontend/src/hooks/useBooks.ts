import { useEffect, useState } from 'react';
import bookApi from '../api/bookApis.ts';
import type { Book } from '../api/types/book.ts';

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        bookApi.findAll()
            .then(res => setBooks(res.data))
            .catch(() => setError('Failed to load books'))
            .finally(() => setLoading(false));
    }, []);

    return { books, loading, error };
};
