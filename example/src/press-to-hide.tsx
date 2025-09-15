import * as React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

export function PressToHideText(props: TextProps) {
  const [visible, setVisible] = React.useState(true);

  // Uncomment to auto-show after 5 seconds
  //   React.useEffect(() => {
  //     setTimeout(() => {
  //       setVisible(true);
  //     }, 5000);
  //   }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Text {...props} style={styles.item} onPress={() => setVisible(!visible)} />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 16,
    fontSize: 16,
    color: '#333333',
  },
});
