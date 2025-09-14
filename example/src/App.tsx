import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { FlatListExample } from './FlatListExample';
import { StackExample } from './StackExample';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StackExample />
        <FlatListExample />
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
});
