import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Renders the root stack navigator and applies theme-aware system UI settings.
function RootNavigator() {
  const { isDark, colors } = useTheme();

  return (
    <>
      {/* Keep the status bar and navigator background in sync with active theme. */}
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade_from_bottom',
        }}
      />
    </>
  );
}

// Wraps the full routed app with the shared theme provider.
export default function RootLayout() {
  return (
    // App-wide theme context wraps all routed screens.
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}