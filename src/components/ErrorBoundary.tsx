import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

interface State {
  error: Error | null;
}

/**
 * Catches render/runtime errors anywhere in the tree and shows the message on screen instead of
 * letting the app crash. Invaluable for diagnosing device-only issues.
 */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <ScrollView style={styles.wrap} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.msg}>{this.state.error.message}</Text>
          <Text style={styles.stack}>{this.state.error.stack}</Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: 24, paddingTop: 80 },
  title: { color: theme.colors.danger, fontSize: 20, fontWeight: '800', marginBottom: 12 },
  msg: { color: theme.colors.text, fontSize: 15, marginBottom: 16 },
  stack: { color: theme.colors.textFaint, fontSize: 11, fontFamily: 'monospace' },
});
