import * as React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ExampleFlatList } from './example-flat-list';
import { ExampleStack } from './example-stack';

export default function App() {
  const [debug, setDebug] = React.useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View>
          <Text style={styles.label}>Debug</Text>
          <Switch value={debug} onValueChange={setDebug} />
        </View>

        <Text style={styles.title}>Stack</Text>
        <ExampleStack debug={debug} />

        <Text style={styles.title}>Flat List</Text>
        <ExampleFlatList debug={debug} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  label: { fontSize: 16 },
});
