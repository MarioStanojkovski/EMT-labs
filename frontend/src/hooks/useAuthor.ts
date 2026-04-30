import { useEffect, useState } from 'react';
import authorApi from '../api/authorApis.ts';
import type { Author } from '../api/types/author.ts';

export const useAuthor = (id: number) => {
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        authorApi.findById(id)
            .then(res => setAuthor(res.data))
            .catch(() => setError('Failed to load author'))
            .finally(() => setLoading(false));
    }, [id]);

    return { author, loading, error };
};
