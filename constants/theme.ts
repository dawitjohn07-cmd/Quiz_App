export const LIGHT_COLORS = {
    background: '#F3F8FC',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    primary: '#0F766E',
    secondary: '#2563EB',
    accent: '#F97316',
    success: '#059669',
    error: '#DC2626',
    warning: '#D97706',
    text: '#0F172A',
    textMuted: '#475569',
    border: '#D6E2EC',
    softTint: '#EAF2F8',
    white: '#FFFFFF',
};

export const DARK_COLORS = {
    background: '#0B1220',
    surface: '#111827',
    card: '#111827',
    primary: '#22C55E',
    secondary: '#38BDF8',
    accent: '#F59E0B',
    success: '#22C55E',
    error: '#F87171',
    warning: '#FBBF24',
    text: '#E5E7EB',
    textMuted: '#9CA3AF',
    border: '#23314A',
    softTint: '#1E293B',
    white: '#FFFFFF',
};

// Backward-compatible alias; theme context selects between LIGHT_COLORS and DARK_COLORS.
export const COLORS = LIGHT_COLORS;

// Shared spacing scale used across screens for consistent layout rhythm.
export const SPACING = {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
};

// Shared corner radius scale for cards, chips, and pill controls.
export const RADII = {
    s: 10,
    m: 16,
    l: 24,
    xl: 32,
    pill: 999,
};