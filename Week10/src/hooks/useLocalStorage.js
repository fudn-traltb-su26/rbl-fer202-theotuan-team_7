import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Lỗi phân tích cú pháp JSON từ localStorage cho khóa:', key, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Lỗi ghi dữ liệu vào localStorage cho khóa:', key, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};
export default useLocalStorage;
