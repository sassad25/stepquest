import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface Props {
  icon: string;
  value: string;
  label: string;
}

/** Compact metric tile (icon, value, label) used in grids on the Today and Stats screens. */
export function StatCard({ icon, value, label }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: theme.spacing(4),
    alignItems: 'center',
  },
  icon: { fontSize: 22, marginBottom: 6 },
  value: { color: theme.colors.text, fontSize: theme.font.h3, fontWeight: '700' },
  label: { color: theme.colors.textFaint, fontSize: theme.font.tiny, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.6 },
});
