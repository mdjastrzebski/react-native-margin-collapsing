import * as React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ExampleFlatList } from './example-flat-list';
import { ExampleStack } from './example-stack';

export default function App() {
  const [marginCollapse, setMarginCollapse] = React.useState(true);
  const [debug, setDebug] = React.useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View style={styles.panel}>
          <Text style={styles.label}>Collapse Margins</Text>
          <Switch
            value={marginCollapse}
            onValueChange={setMarginCollapse}
            trackColor={{ true: '#69bffd' }}
          />
          <Text style={styles.label}>Debug</Text>
          <Switch
            value={debug}
            onValueChange={setDebug}
            trackColor={{ true: '#69bffd' }}
          />
        </View>

        <Text style={styles.title}>Stack</Text>
        <ExampleStack marginCollapse={marginCollapse} debug={debug} />

        <Text style={styles.title}>Flat List</Text>
        <ExampleFlatList marginCollapse={marginCollapse} debug={debug} />
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
  panel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16 },
  label: { fontSize: 16, color: '#333' },
});
