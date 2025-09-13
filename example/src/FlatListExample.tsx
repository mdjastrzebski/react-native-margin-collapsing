import { StyleSheet } from 'react-native';
import {
  type MarginCollapsibleFlatListItem,
  MarginCollapsingFlatList,
} from 'react-native-margin-collapsing';

import { PressToHideText } from './PressToHide';

type ItemData = MarginCollapsibleFlatListItem<{ title: string }>;

export function FlatListExample() {
  const data: ItemData[] = [
    {
      key: '1',
      data: { title: 'Item 1' },
      marginVertical: 10,
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
    {
      key: '4',
      data: { title: 'Item 4' },
      marginVertical: 20,
    },
    {
      key: '5',
      data: { title: 'Item 5' },
      marginVertical: 10,
    },
  ];

  const renderItem = ({ item }: { item: ItemData }) => (
    <PressToHideText style={styles.item}>
      Margin: {item.marginVertical}
    </PressToHideText>
  );

  return (
    <MarginCollapsingFlatList
      data={data}
      renderItem={renderItem}
      //contentContainerStyle={styles.content}
      debug
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
