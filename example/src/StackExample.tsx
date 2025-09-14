import { MCStack } from 'react-native-margin-collapsing';

import { PressToHideText } from './PressToHide';

export function StackExample() {
  const containerItems = [
    {
      key: '1',
      content: <PressToHideText>Margin: 10</PressToHideText>,
      marginVertical: 10,
    },
    {
      key: '2',
      content: <PressToHideText>Margin: 20</PressToHideText>,
      marginVertical: 20,
    },
    {
      key: '3',
      content: <PressToHideText>Margin: 10</PressToHideText>,
      marginVertical: 10,
    },
    {
      key: '4',
      content: <PressToHideText>Margin: 20</PressToHideText>,
      marginVertical: 20,
    },
  ];

  return <MCStack items={containerItems} debug />;
}
