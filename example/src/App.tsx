import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';

import { ExampleFlashList } from './example-flash-list';
import { ExampleFlatList } from './example-flat-list';
import { ExampleStack } from './example-stack';

const Tabs = createBottomTabNavigator({
  screens: {
    Stack: ExampleStack,
    FlatList: ExampleFlatList,
    FlashList: ExampleFlashList,
  },
});

const Navigation = createStaticNavigation(Tabs);

export default function App() {
  return <Navigation />;
}
