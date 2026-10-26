import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Card, SectionHeader } from '../components/Section';
import { StatCard } from '../components/StatCard';
import { theme } from '../theme';
import { StepsState } from '../hooks/useSteps';
import { isoDate, lastNDates, weekdayLabel } from '../lib/metrics';

export function StatsScreen({ steps }: { steps: StepsState }) {
  const days = lastNDates(7);
  const today = isoDate();

  // Include the live count for today even before it's persisted.
  const valueFor = (d: string): number =>
    d === today ? Math.max(steps.steps, steps.history[d]?.steps ?? 0) : steps.history[d]?.steps ?? 0;

  const values = days.map(valueFor);
  const maxVal = Math.max(1, ...values, steps.goal);
  const weeklyTotal = values.reduce((a, b) => a + b, 0);
  const weeklyAvg = Math.round(weeklyTotal / 7);

  return (
    <ScreenContainer title="Stats" subtitle="Your last 7 days">
      <Card>
        <View style={styles.chart}>
          {days.map((d, i) => {
            const v = values[i];
            const h = Math.round((v / maxVal) * 140) + 2;
            const hitGoal = v >= steps.goal && steps.goal > 0;
            return (
              <View key={d} style={styles.barCol}>
                <Text style={styles.barVal}>{v > 0 ? Math.round(v / 100) / 10 + 'k' : ''}</Text>
                <View
                  style={[
                    styles.bar,
                    { height: h, backgroundColor: hitGoal ? theme.colors.success : theme.colors.brand },
                  ]}
                />
                <Text style={[styles.barLabel, d === today && styles.barLabelToday]}>
                  {weekdayLabel(d).slice(0, 2)}
                </Text>
              </View>
            );
          })}
        </View>
      </Card>

      <SectionHeader>This Week</SectionHeader>
      <View style={styles.row}>
        <StatCard icon="👣" value={weeklyTotal.toLocaleString()} label="Total" />
        <View style={{ width: theme.spacing(3) }} />
        <StatCard icon="📊" value={weeklyAvg.toLocaleString()} label="Daily avg" />
        <View style={{ width: theme.spacing(3) }} />
        <StatCard icon="🔥" value={`${steps.streak.best}d`} label="Best streak" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 190 },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: 22, borderRadius: 6 },
  barVal: { color: theme.colors.textFaint, fontSize: theme.font.tiny, marginBottom: 4 },
  barLabel: { color: theme.colors.textFaint, fontSize: theme.font.tiny, marginTop: 6 },
  barLabelToday: { color: theme.colors.accent, fontWeight: '800' },
  row: { flexDirection: 'row' },
});
