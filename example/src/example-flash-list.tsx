import { View } from 'react-native';
import {
  FlashList,
  type FlashListItem,
} from 'react-native-margin-collapsing/flash-list';

import { BACKGROUND_COLORS } from './constants';
import { Panel } from './panel';
import { usePanelState } from './panel-state';
import { PressToHideText } from './press-to-hide';
import { sharedStyles } from './styles';

type Item = FlashListItem<{ title: string }>;

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

export function ExampleFlashList() {
  const { marginCollapse, debug } = usePanelState();

  const renderItem = ({ item }: { item: Item }) => {
    return <PressToHideText>Margin: {item.marginVertical}</PressToHideText>;
  };

  return (
    <View style={sharedStyles.screen}>
      <Panel />

      <FlashList
        data={data}
        renderItem={renderItem}
        marginCollapse={marginCollapse}
        style={sharedStyles.wrapper}
        itemWrapperStyle={debug ? debugItemWrapperStyle : undefined}
      />
    </View>
  );
}

const debugItemWrapperStyle = (_item: Item, index: number) => ({
  backgroundColor: BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
});
