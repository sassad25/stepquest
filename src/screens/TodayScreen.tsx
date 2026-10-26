import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { GoalRing } from '../components/GoalRing';
import { StatCard } from '../components/StatCard';
import { Card, SectionHeader } from '../components/Section';
import { theme } from '../theme';
import { StepsState } from '../hooks/useSteps';
import { clamp01 } from '../lib/metrics';

export function TodayScreen({ steps }: { steps: StepsState }) {
  const progress = clamp01(steps.steps / steps.goal);
  const remaining = Math.max(0, steps.goal - steps.steps);
  const pct = Math.round(progress * 100);

  return (
    <ScreenContainer title="Today" subtitle={new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}>
      <View style={styles.ringWrap}>
        <GoalRing
          progress={progress}
          centerValue={steps.steps.toLocaleString()}
          centerLabel="steps"
        />
        <Text style={styles.goalText}>
          {pct}% of {steps.goal.toLocaleString()} goal
          {remaining > 0 ? ` · ${remaining.toLocaleString()} to go` : ' · goal reached! 🎉'}
        </Text>
      </View>

      {!steps.available && !steps.loading ? (
        <Card>
          <Text style={styles.notice}>
            📱 Step sensor unavailable on this device/simulator. Run StepQuest on a physical phone
            (via Expo Go or a dev build) to see your live step count.
          </Text>
        </Card>
      ) : null}

      <View style={styles.row}>
        <StatCard icon="🔥" value={`${steps.streak.current}d`} label="Streak" />
        <View style={{ width: theme.spacing(3) }} />
        <StatCard icon="📏" value={`${steps.distanceKm.toFixed(2)}`} label="km" />
        <View style={{ width: theme.spacing(3) }} />
        <StatCard icon="⚡" value={`${steps.calories}`} label="kcal" />
      </View>

      <View style={[styles.row, { marginTop: theme.spacing(3) }]}>
        <StatCard icon="⏱️" value={`${steps.activeMinutes}`} label="Active min" />
        <View style={{ width: theme.spacing(3) }} />
        <StatCard icon="🏆" value={steps.best.toLocaleString()} label="Best day" />
        <View style={{ width: theme.spacing(3) }} />
        <StatCard icon="👣" value={steps.lifetime.toLocaleString()} label="Lifetime" />
      </View>

      <SectionHeader>Smart Goal</SectionHeader>
      <Card>
        <Text style={styles.smartText}>
          Your goal adapts to your recent activity — it tracks your 7-day average and nudges you a
          little higher. Today&apos;s target is{' '}
          <Text style={styles.smartHi}>{steps.goal.toLocaleString()}</Text> steps.
        </Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  ringWrap: { alignItems: 'center', marginTop: theme.spacing(2) },
  goalText: { color: theme.colors.textSoft, fontSize: theme.font.body, marginTop: theme.spacing(4), fontWeight: '600' },
  row: { flexDirection: 'row', marginTop: theme.spacing(5) },
  notice: { color: theme.colors.textSoft, fontSize: theme.font.small, lineHeight: 20 },
  smartText: { color: theme.colors.textSoft, fontSize: theme.font.body, lineHeight: 22 },
  smartHi: { color: theme.colors.accent, fontWeight: '800' },
});
