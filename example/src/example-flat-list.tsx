import {
  MCFlatList,
  type MCFlatListItem,
} from 'react-native-margin-collapsing';

import { PressToHideText } from './press-to-hide';

type Item = MCFlatListItem<{ title: string }>;

export function ExampleFlatList() {
  const data: Item[] = [
    {
      key: '1',
      data: { title: 'Item 1' },
      marginVertical: 20,
    },
    {
      key: '2',
      data: { title: 'Item 2' },
      marginVertical: 10,
    },
    {
      key: '3',
      data: { title: 'Item 3' },
      marginVertical: 0,
    },
    {
      key: '4',
      data: { title: 'Item 4' },
      marginVertical: 10,
    },
    {
      key: '5',
      data: { title: 'Item 5' },
      marginVertical: 20,
    },
  ];

  const renderItem = ({ item }: { item: Item }) => {
    return <PressToHideText>Margin: {item.marginVertical}</PressToHideText>;
  };

  return <MCFlatList data={data} renderItem={renderItem} debug />;
}
