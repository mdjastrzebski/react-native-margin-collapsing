import { Text, View, StyleSheet } from 'react-native';
import { MarginCollapsingContainer } from 'react-native-margin-collapsing';

export default function App() {
  const items = [
    {
      key: '1',
      content: <Text style={styles.item}>Item 1</Text>,
      marginVertical: 10,
    },
    {
      key: '2',
      content: <Text style={styles.item}>Item 2</Text>,
      marginVertical: 20,
    },
    {
      key: '3',
      content: <Text style={styles.item}>Item 3</Text>,
      marginVertical: 30,
    },
  ];

  return (
    <View style={styles.screen}>
      <MarginCollapsingContainer items={items} style={styles.container} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'lightgrey',
  },
  item: {
    backgroundColor: 'grey',
  },
});
