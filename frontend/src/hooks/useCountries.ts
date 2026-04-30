import { useEffect, useState } from 'react';
import countryApi from '../api/countryApis.ts';
import type { Country } from '../api/types/country.ts';

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        countryApi.findAll()
            .then(res => setCountries(res.data))
            .catch(() => setError('Failed to load countries'))
            .finally(() => setLoading(false));
    }, []);

    return { countries, loading, error };
};
