import React, { createContext, useContext, useMemo, useState } from 'react';
import { DARK_COLORS, LIGHT_COLORS } from '../../constants/theme';

// Safe defaults allow consumers to render even before provider wiring.
const ThemeContext = createContext({
    isDark: false,
    colors: LIGHT_COLORS,
    toggleTheme: () => { },
});

// Provides theme state and palette selection to all descendant components.
export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    // Memoize context value to avoid unnecessary re-renders in consumers.
    const value = useMemo(() => ({
        isDark,
        colors: isDark ? DARK_COLORS : LIGHT_COLORS,
        toggleTheme: () => setIsDark(prev => !prev),
    }), [isDark]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Returns the current theme context for easy use inside components.
export function useTheme() {
    return useContext(ThemeContext);
}
