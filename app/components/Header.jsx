import React from 'react';
import { View, Text, StyleSheet, Image, Platform, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADII } from '../../constants/theme';
import { useTheme } from '../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

export default function Header({
    title = 'Quiz-App',
    subtitle = 'Test Your Knowledge',
}) {
    const { isDark, colors, toggleTheme } = useTheme();
    const styles = createStyles(colors, isDark);

    return (
        <LinearGradient
            colors={isDark ? ['#111827', '#0F172A', '#1E293B'] : ['#E0F2FE', '#F0FDFA', '#FFF7ED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.headerContent}>
                <View style={styles.logoSection}>
                    <LinearGradient
                        colors={['#0EA5A4', '#2563EB']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.logoContainer}
                    >
                        <Image
                            source={require('../../assets/images/lightlogo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </LinearGradient>
                </View>

                <View style={styles.centerSection}>
                    <View style={styles.textContainer}>
                        <Text style={styles.badge}>DAILY CHALLENGE</Text>
                        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
                            {title}
                        </Text>
                        <Text style={styles.subtitle} numberOfLines={1} adjustsFontSizeToFit>
                            {subtitle}
                        </Text>
                    </View>
                </View>

                <Pressable style={styles.toggleBtn} onPress={toggleTheme}>
                    <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={18} color={colors.text} />
                </Pressable>
            </View>

            <LinearGradient
                colors={['#0EA5A4', '#2563EB']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.bottomBorder}
            />
        </LinearGradient>
    );
}

const createStyles = (colors, isDark) => StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 18,
        elevation: 7,
        borderBottomLeftRadius: RADII.l,
        borderBottomRightRadius: RADII.l,
        overflow: 'hidden',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 54 : 38,
        paddingBottom: SPACING.l,
        paddingHorizontal: SPACING.xl,
        minHeight: 88,
    },
    logoSection: {
        width: 62,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        width: 56,
        height: 56,
        borderRadius: RADII.m,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF55',
        overflow: 'hidden',
    },
    logo: {
        width: 32,
        height: 32,
        borderRadius: RADII.s,
    },
    centerSection: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: SPACING.m,
    },
    textContainer: {
        alignItems: 'flex-start',
        maxWidth: screenWidth * 0.65,
    },
    badge: {
        fontSize: 11,
        color: colors.secondary,
        letterSpacing: 1,
        fontWeight: '800',
        marginBottom: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: colors.text,
        textAlign: 'left',
        letterSpacing: 0.4,
        marginBottom: 1,
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.textMuted,
        textAlign: 'left',
        letterSpacing: 0.2,
    },
    toggleBtn: {
        width: 38,
        height: 38,
        borderRadius: RADII.pill,
        borderWidth: 1,
        borderColor: isDark ? '#334155' : '#FFFFFFAA',
        backgroundColor: isDark ? '#1E293B' : '#FFFFFF88',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBorder: {
        height: 4,
        width: '100%',
    },
});
