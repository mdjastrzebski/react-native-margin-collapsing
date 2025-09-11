import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { MarginCollapsingContainer } from '../container';

test('MarginCollapsingContainer calculates margins correctly', () => {
  // Arrange
  const items = [
    { key: '1', content: <Text>Item 1</Text>, marginVertical: 10 },
    { key: '2', content: <Text>Item 2</Text>, marginTop: 20, marginBottom: 15 },
    { key: '3', content: <Text>Item 3</Text>, marginVertical: 30 },
  ];

  // Act
  render(<MarginCollapsingContainer items={items} />);

  // Assert
  expect(screen.getByText('Item 1')).toBeOnTheScreen();
  expect(screen.getByText('Item 2')).toBeOnTheScreen();
  expect(screen.getByText('Item 3')).toBeOnTheScreen();

  expect(screen.getByTestId('margin-collapsing-item-1')).toHaveStyle({
    marginTop: 10,
    marginBottom: 10,
  });
  expect(screen.getByTestId('margin-collapsing-item-2')).toHaveStyle({
    marginTop: 10,
    marginBottom: 15,
  });
  expect(screen.getByTestId('margin-collapsing-item-3')).toHaveStyle({
    marginTop: 15,
    marginBottom: 30,
  });
});

test('MarginCollapsingContainer calculates margins correctly for single item', () => {
  // Arrange
  const items = [
    { key: '1', content: <Text>Item 1</Text>, marginTop: 10, marginBottom: 20 },
  ];

  // Act
  render(<MarginCollapsingContainer items={items} />);

  // Assert
  expect(screen.getByText('Item 1')).toBeOnTheScreen();
  expect(screen.getByTestId('margin-collapsing-item-1')).toHaveStyle({
    marginTop: 10,
    marginBottom: 20,
  });
});

test('MarginCollapsingContainer calculates margins correctly for two items', () => {
  // Arrange
  const items = [
    { key: '1', content: <Text>Item 1</Text>, marginTop: 10, marginBottom: 20 },
    { key: '2', content: <Text>Item 2</Text>, marginTop: 15, marginBottom: 25 },
  ];

  // Act
  render(<MarginCollapsingContainer items={items} />);

  // Assert
  expect(screen.getByText('Item 1')).toBeOnTheScreen();
  expect(screen.getByTestId('margin-collapsing-item-1')).toHaveStyle({
    marginTop: 10,
    marginBottom: 10,
  });
  expect(screen.getByText('Item 2')).toBeOnTheScreen();
  expect(screen.getByTestId('margin-collapsing-item-2')).toHaveStyle({
    marginTop: 10,
    marginBottom: 25,
  });
});
