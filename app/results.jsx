import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SPACING, RADII } from '../constants/theme';
import { useTheme } from './context/ThemeContext';

export default function ResultsScreen() {
    const { score, total } = useLocalSearchParams();
    const router = useRouter();
    const { colors } = useTheme();
    const styles = React.useMemo(() => createStyles(colors), [colors]);
    const scoreStr = Array.isArray(score) ? score[0] : score;
    const totalStr = Array.isArray(total) ? total[0] : total;
    const scoreNum = Number.parseInt(scoreStr || '0', 10) || 0;
    const totalNum = Number.parseInt(totalStr || '0', 10) || 0;
    const percentage = totalNum > 0 ? Math.round((scoreNum / totalNum) * 100) : 0;

    const getMessage = () => {
        if (percentage >= 85) return 'Outstanding performance';
        if (percentage >= 65) return 'Strong result';
        if (percentage >= 45) return 'Good effort';
        return 'Keep practicing and retry';
    };

    const ringColor = percentage >= 80 ? colors.success : percentage >= 60 ? colors.secondary : colors.accent;

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0F766E', '#2563EB']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroCard}>
                <Text style={styles.heroLabel}>QUIZ COMPLETE</Text>
                <Text style={styles.heroTitle}>{getMessage()}</Text>
                <Text style={styles.heroSubtitle}>You answered {scoreNum} out of {totalNum} correctly.</Text>
            </LinearGradient>

            <View style={styles.content}>
                <View style={styles.progressCard}>
                    <CircularProgress
                        value={percentage}
                        radius={102}
                        duration={1600}
                        progressValueColor={colors.text}
                        maxValue={100}
                        title={`${percentage}%`}
                        titleColor={colors.text}
                        titleStyle={{ fontWeight: '900', fontSize: 32 }}
                        subtitle="Score"
                        subtitleColor={colors.textMuted}
                        subtitleStyle={{ fontSize: 14, fontWeight: '700' }}
                        activeStrokeColor={ringColor}
                        inActiveStrokeColor={colors.softTint}
                        inActiveStrokeOpacity={1}
                        activeStrokeWidth={16}
                        inActiveStrokeWidth={16}
                        showProgressValue={false}
                    />
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{scoreNum}</Text>
                        <Text style={styles.statLabel}>Correct</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{totalNum - scoreNum}</Text>
                        <Text style={styles.statLabel}>Missed</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{totalNum}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>
                </View>

                <View style={styles.actions}>
                    <Pressable
                        style={styles.retryBtn}
                        onPress={() => router.push('/')}
                    >
                        <Ionicons name="home-outline" size={20} color={colors.white} />
                        <Text style={styles.retryBtnText}>Back to Home</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const createStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    heroCard: {
        marginHorizontal: SPACING.l,
        marginTop: SPACING.xl,
        borderRadius: RADII.xl,
        paddingHorizontal: SPACING.l,
        paddingVertical: SPACING.l,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.22,
        shadowRadius: 20,
        elevation: 7,
    },
    heroLabel: {
        color: '#DBEAFE',
        fontWeight: '800',
        letterSpacing: 1,
        fontSize: 12,
        marginBottom: 6,
    },
    heroTitle: {
        color: colors.white,
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 6,
    },
    heroSubtitle: {
        color: '#E0F2FE',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        padding: SPACING.l,
        justifyContent: 'space-evenly',
    },
    progressCard: {
        width: '100%',
        backgroundColor: colors.surface,
        borderRadius: RADII.xl,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: SPACING.l,
        alignItems: 'center',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 4,
    },
    statsRow: {
        width: '100%',
        flexDirection: 'row',
        gap: SPACING.s,
    },
    statBox: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: RADII.m,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: 12,
        alignItems: 'center',
    },
    statValue: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '900',
    },
    statLabel: {
        color: colors.textMuted,
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
    },
    actions: {
        width: '100%',
        gap: SPACING.m,
    },
    retryBtn: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.m,
        borderRadius: RADII.m,
        gap: SPACING.s,
    },
    retryBtnText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '800',
    },
});