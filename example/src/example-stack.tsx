import { VStack, type StackItem } from 'react-native-margin-collapsing';

import { BACKGROUND_COLORS } from './constants';
import { PressToHideText } from './press-to-hide';

export function ExampleStack({
  marginCollapse,
  debug,
}: {
  marginCollapse?: boolean;
  debug?: boolean;
}) {
  return (
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
      style={styles.stack}
      itemWrapperStyle={debug ? debugItemWrapperStyle : undefined}
    />
  );
}

const debugItemWrapperStyle = (_item: StackItem, index: number) => ({
  backgroundColor: BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
});

const styles = {
  stack: {
    borderColor: 'lightgray',
    borderWidth: 1,
  },
};
