import { useEffect, useState } from 'react';
import authorApi from '../api/authorApis.ts';
import type { Author } from '../api/types/author.ts';

export const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        authorApi.findAll()
            .then(res => setAuthors(res.data))
            .catch(() => setError('Failed to load authors'))
            .finally(() => setLoading(false));
    }, []);

    return { authors, loading, error };
};
