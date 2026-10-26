import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { clamp01 } from '../lib/metrics';

interface Props {
  progress: number; // 0..1
  height?: number;
}

/** Simple rounded progress bar with a gradient-like accent fill. */
export function ProgressBar({ progress, height = 10 }: Props) {
  return (
    <View style={[styles.track, { height, borderRadius: height }]}>
      <View
        style={[
          styles.fill,
          { width: `${clamp01(progress) * 100}%`, borderRadius: height },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { backgroundColor: theme.colors.ringTrack, width: '100%', overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: theme.colors.brand },
});
