import { Switch, Text, View } from 'react-native';

import { colors } from './constants';
import { usePanelState } from './panel-state';
import { sharedStyles } from './styles';

export function Panel() {
  const { marginCollapse, setMarginCollapse, debug, setDebug } =
    usePanelState();

  return (
    <View style={sharedStyles.panel}>
      <View style={sharedStyles.panelItem}>
        <Text style={sharedStyles.label}>Collapse Margins</Text>
        <Switch
          value={marginCollapse}
          onValueChange={setMarginCollapse}
          trackColor={{ true: colors.track }}
        />
      </View>
      <View style={sharedStyles.panelItem}>
        <Text style={sharedStyles.label}>Debug</Text>
        <Switch
          value={debug}
          onValueChange={setDebug}
          trackColor={{ true: colors.track }}
        />
      </View>
    </View>
  );
}
