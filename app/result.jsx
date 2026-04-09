import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADII } from '../constants/theme';
import Header from './components/Header'
import { useTheme } from './context/ThemeContext';

// Renders a simplified static result summary screen with a home navigation action.
export default function ResultScreen() {
    const router = useRouter();
    const { colors } = useTheme();
    // Memoize styles so object references stay stable between renders.
    const styles = React.useMemo(() => createStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Header />
            <LinearGradient colors={['#0F766E', '#2563EB']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroCard}>
                <Text style={styles.heroTitle}>Great Job</Text>
                <Text style={styles.heroSubtitle}>You have mastered the basics of this category.</Text>
            </LinearGradient>

            <View style={styles.scoreCard}>
                <View style={styles.scoreCircle}>
                    <Text style={styles.scoreLabel}>Your Score</Text>
                    <Text style={styles.scoreValue}>80%</Text>
                </View>
            </View>

            <View style={styles.btnContainer}>
                <Pressable style={styles.secondaryBtn} onPress={() => router.replace('/')}>
                    <Ionicons name="home-outline" size={18} color={colors.primary} />
                    <Text style={styles.secondaryBtnText}>Back to Home</Text>
                </Pressable>
            </View>
        </View>
    );
}

// Creates the style sheet for the static result screen using active theme colors.
const createStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', padding: SPACING.l },
    heroCard: {
        width: '100%',
        borderRadius: RADII.xl,
        marginTop: SPACING.m,
        marginBottom: SPACING.m,
        padding: SPACING.l,
    },
    heroTitle: { color: colors.white, fontSize: 30, fontWeight: '900', marginBottom: 6 },
    heroSubtitle: { color: '#E0F2FE', fontSize: 14, lineHeight: 21, fontWeight: '600' },
    scoreCard: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: RADII.xl,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: SPACING.xl,
        marginBottom: SPACING.l,
    },
    scoreCircle: {
        width: 190,
        height: 190,
        borderRadius: 95,
        borderWidth: 12,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreLabel: { color: colors.textMuted, fontSize: 16, fontWeight: '700' },
    scoreValue: { color: colors.text, fontSize: 46, fontWeight: '900' },
    btnContainer: { width: '100%', gap: SPACING.m },
    secondaryBtn: {
        backgroundColor: colors.surface,
        borderRadius: RADII.m,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    secondaryBtnText: { color: colors.primary, fontSize: 16, fontWeight: '800' },
});