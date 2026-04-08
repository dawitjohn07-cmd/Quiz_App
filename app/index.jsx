import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SPACING, RADII } from '../constants/theme';
import Header from './components/Header';
import { useTheme } from './context/ThemeContext';

const CATEGORIES = [
  { id: '1', title: 'Technology', icon: 'hardware-chip-outline', color: '#0F766E', eta: '3 mins' },
  { id: '2', title: 'Science', icon: 'flask-outline', color: '#2563EB', eta: '3 mins' },
  { id: '3', title: 'History', icon: 'book-outline', color: '#B45309', eta: '3 mins' },
  { id: '4', title: 'Math', icon: 'calculator-outline', color: '#C2410C', eta: '3 mins' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const isCompactHero = height < 760;
  const styles = createStyles(colors, isDark);

  const renderCategory = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => router.push(`/quiz?category=${item.id}`)}
    >
      <LinearGradient
        colors={[item.color, item.color + 'CC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconContainer}
      >
        <Ionicons name={item.icon} size={24} color={colors.white} />
      </LinearGradient>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Ionicons name="time-outline" size={14} color={item.color} />
            <Text style={[styles.metaText, { color: item.color }]}>{item.eta}</Text>
          </View>
          <Text style={styles.metaHint}>10 questions</Text>
        </View>
      </View>
      <Ionicons name="arrow-forward-circle" size={28} color={item.color} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <LinearGradient
        colors={['#0F766E', '#2563EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, isCompactHero && styles.heroCompact]}
      >
        <Text style={[styles.heroTitle, isCompactHero && styles.heroTitleCompact]}>Select a track and challenge yourself.</Text>
        <View style={[styles.heroStats, isCompactHero && styles.heroStatsCompact]}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Topics</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>40</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>15s</Text>
            <Text style={styles.statLabel}>Per Q</Text>
          </View>
        </View>
      </LinearGradient>
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors, isDark) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: SPACING.l, paddingBottom: SPACING.xl },
  card: {
    backgroundColor: colors.card,
    borderRadius: RADII.l,
    padding: SPACING.m,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: RADII.m,
    marginRight: SPACING.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1 },
  cardTitle: { color: colors.text, fontSize: 19, fontWeight: '800' },
  metaRow: {
    marginTop: SPACING.s,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.softTint,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADII.pill,
    gap: 6,
  },
  metaText: {
    fontWeight: '700',
    fontSize: 12,
  },
  metaHint: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  hero: {
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    paddingBottom: SPACING.m,
    marginTop: SPACING.m,
    marginBottom: SPACING.m,
    borderRadius: RADII.xl,
    marginHorizontal: SPACING.l,
    borderWidth: 1,
    borderColor: isDark ? '#334155' : '#FFFFFF33',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
  heroCompact: {
    paddingTop: SPACING.m - 4,
    paddingBottom: SPACING.m - 4,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 8,
  },
  heroTitleCompact: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 6,
  },
  heroStats: {
    marginTop: SPACING.m,
    backgroundColor: '#FFFFFF1F',
    borderRadius: RADII.m,
    borderWidth: 1,
    borderColor: '#FFFFFF33',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  heroStatsCompact: {
    marginTop: SPACING.s,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: '#DBEAFE',
    fontSize: 12,
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#FFFFFF55',
  },
});