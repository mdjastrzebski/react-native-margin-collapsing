import { MCStack } from 'react-native-margin-collapsing';

import { PressToHideText } from './press-to-hide';

export function ExampleStack() {
  return (
    <MCStack
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
      debug
    />
  );
}
