import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || false);
    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);
    const setThemeMode = (mode) => setTheme(mode);
    return (
        <div>
            <ThemeContext.Provider value={{ theme, setThemeMode }}>{props.children}</ThemeContext.Provider>
        </div>
    );
};

const useThemeHook = () => {
    const { theme } = useContext(ThemeContext);
    return [theme];
};

export { ThemeProvider, ThemeContext, useThemeHook };
