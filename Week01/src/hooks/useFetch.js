import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000
});

const cleanParams = (params) => Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
);

export const useFetch = (url, params = {}) => {
    const serializedParams = JSON.stringify(params);
    const parsedParams = useMemo(() => JSON.parse(serializedParams), [serializedParams]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const refetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get(url, { params: cleanParams(parsedParams) });
            setData(response.data);
            setError('');
        } catch (err) {
            setError(err.message || 'Request failed');
        } finally {
            setLoading(false);
        }
    }, [parsedParams, url]);

    useEffect(() => {
        const timer = setTimeout(refetch, 0);
        return () => clearTimeout(timer);
    }, [refetch]);

    return { data, loading, error, refetch };
};
