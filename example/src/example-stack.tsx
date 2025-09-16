import * as React from 'react';
import { Switch, Text, View } from 'react-native';
import { type StackItem, VStack } from 'react-native-margin-collapsing';

import { BACKGROUND_COLORS, colors } from './constants';
import { PressToHideText } from './press-to-hide';
import { sharedStyles } from './styles';

export function ExampleStack() {
  const [marginCollapse, setMarginCollapse] = React.useState(true);
  const [debug, setDebug] = React.useState(true);

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
      <VStack
        items={[
          {
            key: '1',
            content: <PressToHideText>Margin: 20</PressToHideText>,
            marginVertical: 20,
          },
          {
            key: '2',
            content: <PressToHideText>Margin: 10</PressToHideText>,
            marginVertical: 10,
          },
          {
            key: '3',
            content: <PressToHideText>Margin: 0</PressToHideText>,
            marginVertical: 0,
          },
          {
            key: '4',
            content: <PressToHideText>Margin: 10</PressToHideText>,
            marginVertical: 10,
          },
          {
            key: '5',
            content: <PressToHideText>Margin: 20</PressToHideText>,
            marginVertical: 20,
          },
        ]}
        marginCollapse={marginCollapse}
        style={sharedStyles.wrapper}
        itemWrapperStyle={debug ? debugItemWrapperStyle : undefined}
      />
    </View>
  );
}

const debugItemWrapperStyle = (_item: StackItem, index: number) => ({
  backgroundColor: BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
});
