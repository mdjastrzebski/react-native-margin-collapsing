import { View } from 'react-native';
import { type StackItem, VStack } from 'react-native-margin-collapsing';

import { BACKGROUND_COLORS } from './constants';
import { Panel } from './panel';
import { usePanelState } from './panel-state';
import { PressToHideText } from './press-to-hide';
import { sharedStyles } from './styles';

export function ExampleStack() {
  const { marginCollapse, debug } = usePanelState();

  return (
    <View style={sharedStyles.screen}>
      <Panel />
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
