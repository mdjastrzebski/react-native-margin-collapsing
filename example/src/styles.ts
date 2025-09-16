import { StyleSheet } from 'react-native';

import { colors } from './constants';

export const sharedStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  panel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  panelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wrapper: {
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  title: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16 },
  label: { fontSize: 16, color: colors.text },
});
