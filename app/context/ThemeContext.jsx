import React, { createContext, useContext, useMemo, useState } from 'react';
import { DARK_COLORS, LIGHT_COLORS } from '../../constants/theme';

const ThemeContext = createContext({
    isDark: false,
    colors: LIGHT_COLORS,
    toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    const value = useMemo(() => ({
        isDark,
        colors: isDark ? DARK_COLORS : LIGHT_COLORS,
        toggleTheme: () => setIsDark(prev => !prev),
    }), [isDark]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}
