import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { theme } from '../theme';
import { ACHIEVEMENTS } from '../lib/data';
import { StepsState } from '../hooks/useSteps';
import { clamp01 } from '../lib/metrics';
import { ProgressBar } from '../components/ProgressBar';

export function AchievementsScreen({ steps }: { steps: StepsState }) {
  // "ten-k-day" unlocks on a single-day best >= 10k; the rest use lifetime steps.
  const isUnlocked = (id: string, threshold: number): boolean => {
    if (id === 'ten-k-day') return steps.best >= 10_000;
    return steps.lifetime >= threshold;
  };
  const progressFor = (id: string, threshold: number): number => {
    if (id === 'ten-k-day') return clamp01(steps.best / 10_000);
    return clamp01(steps.lifetime / threshold);
  };

  const unlockedCount = ACHIEVEMENTS.filter((a) => isUnlocked(a.id, a.threshold)).length;

  return (
    <ScreenContainer
      title="Achievements"
      subtitle={`${unlockedCount} of ${ACHIEVEMENTS.length} unlocked`}
    >
      {ACHIEVEMENTS.map((a) => {
        const unlocked = isUnlocked(a.id, a.threshold);
        const progress = progressFor(a.id, a.threshold);
        return (
          <View key={a.id} style={[styles.row, !unlocked && styles.locked]}>
            <Text style={styles.icon}>{unlocked ? a.icon : '🔒'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{a.title}</Text>
              <Text style={styles.desc}>{a.description}</Text>
              {!unlocked ? (
                <View style={{ marginTop: theme.spacing(2) }}>
                  <ProgressBar progress={progress} height={6} />
                </View>
              ) : (
                <Text style={styles.unlockedTag}>Unlocked ✓</Text>
              )}
            </View>
          </View>
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  locked: { opacity: 0.7 },
  icon: { fontSize: 30, marginRight: theme.spacing(4) },
  title: { color: theme.colors.text, fontSize: theme.font.h3, fontWeight: '700' },
  desc: { color: theme.colors.textFaint, fontSize: theme.font.small, marginTop: 2 },
  unlockedTag: { color: theme.colors.success, fontSize: theme.font.small, fontWeight: '700', marginTop: 4 },
});
