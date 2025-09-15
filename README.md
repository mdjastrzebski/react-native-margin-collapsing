# React Native Margin Collapsing

Zero-dependency margin-collapsing views for React Native: `VStack` (`View`), `FlatList`.

### What is margin collapsing?

When two adjacent elements have vertical margins, only the larger margin is used instead of adding them together. This prevents extra space from accumulating between elements.

<img src="https://github.com/user-attachments/assets/2381daa9-c844-4d9b-a994-2b631c095d74" alt="Margin Collapsing Visualized" width="335" height="400" />

## How does it work

This library mimics CSS margin collapsing in React Native. Instead of using the `style` prop for margins, each child component specifies its vertical margin directly. The library then compares the margins of adjacent elements and applies only the larger one, preventing extra space from stacking up between them.

## Installation

```sh
npm install react-native-margin-collapsing
```

## Usage

### Stack View

```tsx
import { VStack } from 'react-native-margin-collapsing';

function StackExample() {
  return (
    <VStack
      items={[
        {
          key: 'item-1',
          content: <Text>Margin: 20</Text>,
          marginVertical: 20,
        },
        {
          key: '2',
          content: <Text>Margin: 0</Text>,
          marginVertical: 0,
        },
        {
          key: 'item-3',
          content: <Text>Margin: 10</Text>,
          marginVertical: 10,
        },
      ]}
    />
  );
}
```

### FlatList

```tsx
import { FlatList } from 'react-native-margin-collapsing';

const data: Item[] = [
  {
    key: 'item-1',
    data: { title: 'Item 1' },
    marginVertical: 20,
  },
  {
    key: '2',
    data: { title: 'Item 2' },
    marginVertical: 0,
  },
  {
    key: '3',
    data: { title: 'Item 3' },
    marginVertical: 10,
  },
];

function FlatListExample() {
  const renderItem = ({ item }: { item: Item }) => {
    return <Text>Margin: {item.marginVertical}</Text>;
  };

  return <FlatList data={data} renderItem={renderItem} />;
}
```

Note: `data` prop has slightly different shape then regular `FlatList`.

## Contributing

PRs welcome! Keep it awesome.

## License

MIT 💝

---

Made with 💻, ☕️, and [CRNL](https://github.com/callstack/react-native-builder-bob) by [MDJ](https://x.com/mdj_dev/)
