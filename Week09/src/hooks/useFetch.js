import { useState, useEffect, useCallback } from 'react';

export const useFetch = (fetchFn) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const execute = useCallback(async () => {
        try {
            setLoading(true);
            const result = await fetchFn();
            setData(result);
            setError('');
        } catch (err) {
            setError(err.message || 'Không thể kết nối máy chủ.');
        } finally {
            setLoading(false);
        }
    }, [fetchFn]);

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, setData, loading, error, refetch: execute };
};
export default useFetch;
