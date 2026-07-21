import { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './themeContext';

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark((current) => !current);
    };

    const value = useMemo(() => ({
        isDark,
        toggleTheme
    }), [isDark]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
