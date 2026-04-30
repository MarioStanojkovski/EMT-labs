import { useEffect, useState } from 'react';
import countryApi from '../api/countryApis.ts';
import type { Country } from '../api/types/country.ts';

export const useCountry = (id: number) => {
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        countryApi.findById(id)
            .then(res => setCountry(res.data))
            .catch(() => setError('Failed to load country'))
            .finally(() => setLoading(false));
    }, [id]);

    return { country, loading, error };
};
