import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  scroll?: boolean;
}

/** Consistent screen scaffold: safe-area padding, title/subtitle header, and optional scroll. */
export function ScreenContainer({ title, subtitle, children, scroll = true }: Props) {
  const body = (
    <View style={styles.body}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={{ height: theme.spacing(4) }} />
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {body}
        </ScrollView>
      ) : (
        body
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  scroll: { paddingBottom: theme.spacing(10) },
  body: { paddingHorizontal: theme.spacing(5), paddingTop: theme.spacing(3) },
  title: { color: theme.colors.text, fontSize: theme.font.h1, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: theme.colors.textFaint, fontSize: theme.font.body, marginTop: 4 },
});
