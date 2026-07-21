import { useCallback, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            setStoredValue((currentValue) => {
                const valueToStore = value instanceof Function ? value(currentValue) : value;
                localStorage.setItem(key, JSON.stringify(valueToStore));
                return valueToStore;
            });
        } catch (error) {
            console.error('localStorage update failed:', error);
        }
    }, [key]);

    return [storedValue, setValue];
};
