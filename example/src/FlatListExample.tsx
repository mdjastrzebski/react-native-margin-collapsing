import { Text, StyleSheet } from 'react-native';
import {
  MarginCollapsingFlatList,
  type MarginCollapsibleFlatListItem,
} from 'react-native-margin-collapsing';

type ItemData = MarginCollapsibleFlatListItem<{ title: string }>;

export function FlatListExample() {
  const data: ItemData[] = [
    {
      key: '1',
      data: { title: 'Item 1' },
      marginVertical: 30,
    },
    {
      key: '2',
      data: { title: 'Item 2' },
      marginVertical: 20,
    },
    {
      key: '3',
      data: { title: 'Item 3' },
      marginVertical: 30,
    },
  ];

  const renderItem = ({ item }: { item: ItemData }) => (
    <Text style={styles.item}>{item.data.title}</Text>
  );

  return (
    <MarginCollapsingFlatList
      debug
      data={data}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'lightgrey',
  },
  item: {
    backgroundColor: 'grey',
  },
});
