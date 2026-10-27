// react-native-gesture-handler must be imported first, before any other imports,
// for React Navigation's gesture/animation support to initialize correctly on device.
import 'react-native-gesture-handler';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './src/theme';
import { useSteps } from './src/hooks/useSteps';
import { TodayScreen } from './src/screens/TodayScreen';
import { AdventureScreen } from './src/screens/AdventureScreen';
import { AchievementsScreen } from './src/screens/AchievementsScreen';
import { StatsScreen } from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.bg,
    card: theme.colors.bgElev,
    border: theme.colors.border,
    text: theme.colors.text,
    primary: theme.colors.brand,
  },
};

const TAB_ICON: Record<string, string> = {
  Today: '👣',
  Adventure: '🧭',
  Achievements: '🏆',
  Stats: '📊',
};

export default function App() {
  const steps = useSteps();

  if (steps.loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={theme.colors.brand} size="large" />
        <Text style={styles.loadingText}>Starting StepQuest…</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: theme.colors.brand,
            tabBarInactiveTintColor: theme.colors.textFaint,
            tabBarStyle: {
              backgroundColor: theme.colors.bgElev,
              borderTopColor: theme.colors.border,
              height: 64,
              paddingBottom: 10,
              paddingTop: 8,
            },
            tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>{TAB_ICON[route.name] ?? '•'}</Text>
            ),
          })}
        >
          <Tab.Screen name="Today">{() => <TodayScreen steps={steps} />}</Tab.Screen>
          <Tab.Screen name="Adventure">{() => <AdventureScreen steps={steps} />}</Tab.Screen>
          <Tab.Screen name="Achievements">{() => <AchievementsScreen steps={steps} />}</Tab.Screen>
          <Tab.Screen name="Stats">{() => <StatsScreen steps={steps} />}</Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: theme.colors.bg, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: theme.colors.textSoft, marginTop: theme.spacing(4), fontSize: theme.font.body },
});
