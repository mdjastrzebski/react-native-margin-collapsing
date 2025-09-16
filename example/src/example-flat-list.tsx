import * as React from 'react';
import { Switch, Text, View } from 'react-native';
import { FlatList, type FlatListItem } from 'react-native-margin-collapsing';

import { BACKGROUND_COLORS, colors } from './constants';
import { PressToHideText } from './press-to-hide';
import { sharedStyles } from './styles';

type Item = FlatListItem<{ title: string }>;

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

export function ExampleFlatList() {
  const [marginCollapse, setMarginCollapse] = React.useState(true);
  const [debug, setDebug] = React.useState(true);

  const renderItem = ({ item }: { item: Item }) => {
    return <PressToHideText>Margin: {item.marginVertical}</PressToHideText>;
  };

  return (
    <View style={sharedStyles.screen}>
      <View style={sharedStyles.panel}>
        <Text style={sharedStyles.label}>Collapse Margins</Text>
        <Switch
          value={marginCollapse}
          onValueChange={setMarginCollapse}
          trackColor={{ true: colors.track }}
        />
        <Text style={sharedStyles.label}>Debug</Text>
        <Switch
          value={debug}
          onValueChange={setDebug}
          trackColor={{ true: colors.track }}
        />
      </View>

      <FlatList
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
