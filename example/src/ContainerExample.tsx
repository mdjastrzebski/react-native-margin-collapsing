import * as React from 'react';
import { StyleSheet, Text, type TextProps, View } from 'react-native';
import { MarginCollapsingContainer } from 'react-native-margin-collapsing';

export function ContainerExample() {
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

  return (
    <MarginCollapsingContainer
      items={containerItems}
      style={styles.container}
      debug
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  item: {
    backgroundColor: 'grey',
  },
});

function ZeroSizeView() {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      setCounter((c) => c + 1);
    }, 2000);
  }, []);

  return (
    <View style={{ height: counter * 20, backgroundColor: 'darkGrey' }}>
      {counter > 0 && <Text>Zero Size View (height: {counter * 20})</Text>}
    </View>
  );
}

function NullView() {
  return null;
}

function PressToHideText(props: TextProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) {
    return null;
  }

  return (
    <Text {...props} style={styles.item} onPress={() => setVisible(!visible)} />
  );
}
