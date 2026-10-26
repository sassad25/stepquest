import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Card } from '../components/Section';
import { ProgressBar } from '../components/ProgressBar';
import { theme } from '../theme';
import { ADVENTURES } from '../lib/data';
import { StepsState } from '../hooks/useSteps';
import { clamp01 } from '../lib/metrics';

export function AdventureScreen({ steps }: { steps: StepsState }) {
  // Lifetime steps drive progress along each journey.
  const total = steps.lifetime;

  return (
    <ScreenContainer
      title="Adventure"
      subtitle="Turn your steps into journeys along famous trails"
    >
      {ADVENTURES.map((adv) => {
        const progress = clamp01(total / adv.totalSteps);
        const pct = Math.round(progress * 100);
        const reached = [...adv.stops].filter((s) => total >= s.atStep);
        const current = reached[reached.length - 1];
        const next = adv.stops.find((s) => total < s.atStep);

        return (
          <View key={adv.id} style={{ marginBottom: theme.spacing(5) }}>
            <Card>
              <View style={styles.headRow}>
                <Text style={styles.name}>{adv.name}</Text>
                <Text style={styles.pct}>{pct}%</Text>
              </View>
              <Text style={styles.desc}>{adv.description}</Text>

              <View style={{ height: theme.spacing(4) }} />
              <ProgressBar progress={progress} height={12} />

              <View style={styles.stopsRow}>
                <Text style={styles.stopLabel}>📍 {current ? current.name : adv.stops[0].name}</Text>
                <Text style={styles.stopLabel}>
                  {next ? `→ ${next.name}` : '🏁 Complete!'}
                </Text>
              </View>

              <Text style={styles.detail}>
                {total.toLocaleString()} / {adv.totalSteps.toLocaleString()} steps
                {next ? ` · ${(next.atStep - total).toLocaleString()} to ${next.name}` : ''}
              </Text>
            </Card>
          </View>
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: theme.colors.text, fontSize: theme.font.h3, fontWeight: '800' },
  pct: { color: theme.colors.accent, fontSize: theme.font.h3, fontWeight: '800' },
  desc: { color: theme.colors.textFaint, fontSize: theme.font.small, marginTop: 4 },
  stopsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: theme.spacing(3) },
  stopLabel: { color: theme.colors.textSoft, fontSize: theme.font.small, fontWeight: '600' },
  detail: { color: theme.colors.textFaint, fontSize: theme.font.tiny, marginTop: theme.spacing(2) },
});
