import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Apply dark mode class to body element when theme changes
    useEffect(() => {
        const body = document.body;
        if (theme === 'dark') {
            body.classList.add('bg-dark', 'text-light');
            body.style.backgroundColor = '#212529';
            body.style.color = '#f8f9fa';
        } else {
            body.classList.remove('bg-dark', 'text-light');
            body.style.backgroundColor = '#ffffff';
            body.style.color = '#212529';
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
