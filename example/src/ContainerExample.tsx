import { StyleSheet, Text } from 'react-native';
import { MarginCollapsingContainer } from 'react-native-margin-collapsing';

export function ContainerExample() {
  const containerItems = [
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
    <MarginCollapsingContainer
      items={containerItems}
      style={styles.container}
      debug
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  item: {
    backgroundColor: 'grey',
  },
});
