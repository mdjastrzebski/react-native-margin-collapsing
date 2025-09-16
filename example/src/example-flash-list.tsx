import {
  FlashList,
  type FlashListItem,
} from 'react-native-margin-collapsing/flash-list';

import { BACKGROUND_COLORS } from './constants';
import { PressToHideText } from './press-to-hide';

type Item = FlashListItem<{ title: string }>;

export function ExampleFlashList({
  marginCollapse,
  debug,
}: {
  marginCollapse?: boolean;
  debug?: boolean;
}) {
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

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      marginCollapse={marginCollapse}
      style={styles.list}
      itemWrapperStyle={debug ? debugItemWrapperStyle : undefined}
    />
  );
}

const debugItemWrapperStyle = (_item: Item, index: number) => ({
  backgroundColor: BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
});

const styles = {
  list: {
    borderColor: 'lightgray',
    borderWidth: 1,
  },
};
