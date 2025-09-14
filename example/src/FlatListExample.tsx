import {
  MCFlatList,
  type MCFlatListItem,
} from 'react-native-margin-collapsing';

import { PressToHideText } from './PressToHide';

type Item = MCFlatListItem<{ title: string }>;

export function FlatListExample() {
  const data: Item[] = [
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
  ] as const;

  const renderItem = ({ item }: { item: Item }) => {
    return <PressToHideText>Margin: {item.marginVertical}</PressToHideText>;
  };

  return <MCFlatList data={data} renderItem={renderItem} debug />;
}
