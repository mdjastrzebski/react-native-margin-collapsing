import React, { useEffect } from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

export function PressToHideText(props: TextProps) {
  const [visible, setVisible] = React.useState(true);

  //   useEffect(() => {
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
    backgroundColor: 'grey',
  },
});
