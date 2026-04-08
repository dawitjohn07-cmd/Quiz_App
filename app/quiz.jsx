import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADII } from '../constants/theme';
import Header from './components/Header'
import QUESTIONS from './data/Questions'

import { useTheme } from './context/ThemeContext';

const CATEGORY_META = {
    '1': { label: 'Technology', icon: 'hardware-chip-outline', color: '#0F766E' },
    '2': { label: 'Science', icon: 'flask-outline', color: '#2563EB' },
    '3': { label: 'History', icon: 'book-outline', color: '#B45309' },
    '4': { label: 'Math', icon: 'calculator-outline', color: '#C2410C' },
};

export default function QuizScreen() {
    const { category } = useLocalSearchParams();
    const router = useRouter();
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
    const categoryId = Array.isArray(category) ? category[0] : category;
    const categoryInfo = CATEGORY_META[categoryId] || { label: 'Quiz', icon: 'sparkles-outline', color: colors.primary };
    const categoryQuestions = useMemo(() => QUESTIONS[categoryId] || [], [categoryId]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(15);
    const [showFeedback, setShowFeedback] = useState(false);
    const [timedOut, setTimedOut] = useState(false);
    const [feedbackCorrect, setFeedbackCorrect] = useState(null);
    const [feedbackSelected, setFeedbackSelected] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
        return () => clearInterval(timer);
    }, []);

    const startFeedback = useCallback((answerIndex, timeout = false) => {
        const correctIndex = categoryQuestions[currentIndex].correct;
        setFeedbackCorrect(correctIndex);
        setFeedbackSelected(timeout ? null : answerIndex);
        setTimedOut(timeout);
        setShowFeedback(true);

        const isCorrect = !timeout && answerIndex === correctIndex;
        const nextScore = isCorrect ? score + 1 : score;

        setTimeout(() => {
            if (currentIndex < categoryQuestions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedAnswer(null);
                setTimeLeft(15);
                setShowFeedback(false);
                setTimedOut(false);
                setFeedbackCorrect(null);
                setFeedbackSelected(null);
                if (isCorrect) {
                    setScore(nextScore);
                }
            } else {
                setScore(nextScore);
                router.push(`/results?score=${nextScore}&total=${categoryQuestions.length}`);
            }
        }, 2000);
    }, [categoryQuestions, currentIndex, router, score]);

    useEffect(() => {
        if (timeLeft === 0 && !showFeedback) {
            startFeedback(null, true);
        }
    }, [timeLeft, showFeedback, startFeedback]);

    const handleNext = () => {
        if (selectedAnswer !== null && !showFeedback) {
            startFeedback(selectedAnswer, false);
        }
    };

    if (categoryQuestions.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.questionText}>No questions available for this category.</Text>
            </SafeAreaView>
        );
    }

    const currentQuestion = categoryQuestions[currentIndex];

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.contentWrap}>
                <ScrollView
                    style={styles.scrollArea}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.topBar}>
                        <View style={styles.categoryBadge}>
                            <Ionicons name={categoryInfo.icon} size={16} color={categoryInfo.color} />
                            <Text style={[styles.categoryLabel, { color: categoryInfo.color }]}>{categoryInfo.label}</Text>
                        </View>
                        <View style={styles.timerContainer}>
                            <Ionicons name="time-outline" size={14} color={colors.warning} />
                            <Text style={styles.timerText}>{timeLeft}s</Text>
                        </View>
                    </View>

                    <View style={styles.progressHeader}>
                        <Text style={styles.progressText}>Question {currentIndex + 1} of {categoryQuestions.length}</Text>
                        <Text style={styles.progressPct}>{Math.round(((currentIndex + 1) / categoryQuestions.length) * 100)}%</Text>
                    </View>

                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${((currentIndex + 1) / categoryQuestions.length) * 100}%` }]} />
                    </View>

                    <View style={styles.questionCard}>
                        <Text style={styles.questionTitle}>Question</Text>
                        <Text style={styles.questionText}>{currentQuestion.question}</Text>
                    </View>

                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((opt, index) => {
                            let optionStyle = [styles.optionBtn];
                            let textColor = colors.text;
                            let indexStyle = [styles.optionIndex];
                            let state = 'default';

                            if (showFeedback) {
                                if (index === feedbackCorrect) {
                                    state = 'correct';
                                    optionStyle.push(styles.correctOption);
                                    indexStyle.push(styles.optionIndexCorrect);
                                    textColor = colors.white;
                                } else if (timedOut || index === feedbackSelected) {
                                    state = 'wrong';
                                    optionStyle.push(styles.wrongOption);
                                    indexStyle.push(styles.optionIndexWrong);
                                    textColor = colors.white;
                                } else {
                                    state = 'neutral';
                                    optionStyle.push(styles.neutralOption);
                                    indexStyle.push(styles.optionIndexNeutral);
                                    textColor = colors.textMuted;
                                }
                            } else if (selectedAnswer === index) {
                                state = 'selected';
                                optionStyle.push(styles.optionSelected);
                                indexStyle.push(styles.optionIndexSelected);
                                textColor = '#0F172A';
                            }

                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => !showFeedback && setSelectedAnswer(index)}
                                    style={optionStyle}
                                    disabled={showFeedback}
                                >
                                    <Text style={[...indexStyle, { color: textColor }]}>{String.fromCharCode(65 + index)}</Text>
                                    <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
                                    {showFeedback && state === 'correct' ? (
                                        <Ionicons name="checkmark-circle" size={20} color={colors.white} />
                                    ) : null}
                                    {showFeedback && state === 'wrong' ? (
                                        <Ionicons name="close-circle" size={20} color={colors.white} />
                                    ) : null}
                                </Pressable>
                            );
                        })}
                    </View>
                </ScrollView>

                <Pressable style={[styles.nextBtn, showFeedback && styles.disabledBtn]} onPress={handleNext} disabled={showFeedback}>
                    <Text style={styles.nextBtnText}>{showFeedback ? 'Checking answer...' : 'Lock In Answer'}</Text>
                    <Ionicons name="arrow-forward" size={18} color={colors.white} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const createStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    contentWrap: { flex: 1 },
    scrollArea: { flex: 1 },
    scrollContent: { padding: SPACING.l, paddingBottom: SPACING.s },
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.m, marginTop: SPACING.s },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: RADII.pill,
        borderWidth: 1,
        borderColor: colors.border,
        gap: 6,
    },
    categoryLabel: { fontWeight: '800', fontSize: 13 },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressText: { color: colors.textMuted, fontWeight: '700' },
    progressPct: { color: colors.text, fontWeight: '900', fontSize: 14 },
    timerContainer: {
        backgroundColor: '#FFF7ED',
        borderWidth: 1,
        borderColor: '#FED7AA',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: RADII.pill,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    timerText: { color: colors.warning, fontWeight: '800' },
    progressBarBg: { height: 10, backgroundColor: '#DBE7F1', borderRadius: RADII.pill, marginBottom: SPACING.l },
    progressBarFill: { height: 10, backgroundColor: colors.primary, borderRadius: RADII.pill },
    questionCard: {
        marginBottom: SPACING.m,
        backgroundColor: colors.surface,
        borderRadius: RADII.l,
        borderWidth: 1,
        borderColor: colors.border,
        padding: SPACING.l,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.07,
        shadowRadius: 18,
        elevation: 4,
    },
    questionTitle: {
        color: colors.secondary,
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 0.7,
        marginBottom: 8,
    },
    questionText: { color: colors.text, fontSize: 21, fontWeight: '800', lineHeight: 30 },
    optionsContainer: { gap: SPACING.m, marginBottom: SPACING.m },
    optionBtn: {
        backgroundColor: colors.surface,
        padding: 14,
        borderRadius: RADII.m,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    optionIndex: {
        width: 26,
        height: 26,
        borderRadius: RADII.pill,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '900',
        fontSize: 13,
        backgroundColor: colors.softTint,
        overflow: 'hidden',
        lineHeight: 26,
        marginTop: 1,
    },
    optionIndexSelected: { backgroundColor: '#99F6E4' },
    optionIndexCorrect: { backgroundColor: '#FFFFFF33' },
    optionIndexWrong: { backgroundColor: '#FFFFFF33' },
    optionIndexNeutral: { backgroundColor: '#DCE6EE' },
    optionSelected: { borderColor: colors.primary, backgroundColor: '#CCFBF1' },
    optionText: { color: colors.text, fontSize: 15, fontWeight: '600', flex: 1, flexShrink: 1, lineHeight: 22 },
    correctOption: { backgroundColor: colors.success, borderColor: colors.success },
    wrongOption: { backgroundColor: colors.error, borderColor: colors.error },
    neutralOption: { backgroundColor: '#EEF3F7', borderColor: '#D9E2EC' },
    nextBtn: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: RADII.m,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        marginHorizontal: SPACING.l,
        marginTop: 4,
        marginBottom: 20
    },
    disabledBtn: { backgroundColor: colors.textMuted },
    nextBtnText: { color: colors.white, fontSize: 17, fontWeight: '800' },
});