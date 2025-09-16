import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';

import { ExampleFlashList } from './example-flash-list';
import { ExampleFlatList } from './example-flat-list';
import { ExampleStack } from './example-stack';

const Tabs = createBottomTabNavigator({
  screens: {
    Stack: { screen: ExampleStack, options: { title: 'V Stack' } },
    FlatList: { screen: ExampleFlatList, options: { title: 'Flat List' } },
    FlashList: { screen: ExampleFlashList, options: { title: 'Flash List' } },
  },
});

const Navigation = createStaticNavigation(Tabs);

export default function App() {
  return <Navigation />;
}
