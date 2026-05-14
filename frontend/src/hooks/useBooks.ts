import { useEffect, useState } from 'react';
import bookApi from '../api/bookApis.ts';
import type { Book } from '../api/types/book.ts';

export const useBooks = (stateFilter?: string) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const request = stateFilter
            ? bookApi.filter(stateFilter).then(res => res.data.content)
            : bookApi.findAll().then(res => res.data);

        request
            .then(data => setBooks(data))
            .catch(() => setError('Failed to load books'))
            .finally(() => setLoading(false));
    }, [stateFilter]);

    return { books, loading, error };
};
