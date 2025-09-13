import { View, type LayoutChangeEvent } from 'react-native';
import { DEBUG_COLORS } from './constants';
import type { ItemStyle, MarginCollapsingItem } from './types';

export function getMarginTop(item: MarginCollapsingItem): number {
  return item.marginTop ?? item.marginVertical ?? 0;
}

export function getMarginBottom(item: MarginCollapsingItem): number {
  return item.marginBottom ?? item.marginVertical ?? 0;
}

export function getPreviousNonZeroItem<T extends MarginCollapsingItem>(
  items: ArrayLike<T>,
  isHiddenMap: Record<string, boolean>,
  startIndex: number
): T | null {
  for (let i = startIndex - 1; i >= 0; i--) {
    const item = items[i]!;
    if (!isHiddenMap[item.key]) {
      return item;
    }
  }

  return null;
}

export function getNextNonZeroItem<T extends MarginCollapsingItem>(
  items: ArrayLike<T>,
  isHiddenMap: Record<string, boolean>,
  startIndex: number
): T | null {
  for (let i = startIndex + 1; i < items.length; i++) {
    const item = items[i]!;
    if (!isHiddenMap[item.key]) {
      return item;
    }
  }

  return null;
}

export function validateKeyUniqueness(items: MarginCollapsingItem[]): void {
  const keySet = new Set<string>();
  items.forEach((item) => {
    const key = item.key;
    if (keySet.has(key)) {
      throw new Error(
        `Duplicate key "${key}" found in MarginCollapsingContainer items. Keys should be unique to ensure proper behavior.`
      );
    }

    keySet.add(key);
  });
}

type CalculateChildViewOptions = {
  items: ArrayLike<MarginCollapsingItem>;
  index: number;
  isHiddenMap: Record<string, boolean>;
  onRequestRender: () => void;
  debug?: boolean;
};

export function wrapElement(
  element: React.ReactNode,
  {
    items,
    index,
    isHiddenMap,
    onRequestRender,
    debug,
  }: CalculateChildViewOptions
): React.ReactNode {
  const currentItem = items[index]!;
  const previousItem = getPreviousNonZeroItem(items, isHiddenMap, index);
  const nextItem = getNextNonZeroItem(items, isHiddenMap, index);

  const style: ItemStyle = {};

  if (!previousItem) {
    style.paddingTop = getMarginTop(currentItem);
  } else {
    style.paddingTop =
      Math.max(getMarginTop(currentItem), getMarginBottom(previousItem)) / 2;
  }

  if (!nextItem) {
    style.paddingBottom = getMarginBottom(currentItem);
  } else {
    style.paddingBottom =
      Math.max(getMarginBottom(currentItem), getMarginTop(nextItem)) / 2;
  }

  const key = currentItem.key;

  if (isHiddenMap[key]) {
    console.log('Skipping ', key);
    style.paddingTop = 0;
    style.paddingBottom = 0;
  }

  if (debug) {
    style.backgroundColor = DEBUG_COLORS[index % DEBUG_COLORS.length];
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const isHidden = event.nativeEvent.layout.height === 0;
    const isHiddenOld = !!isHiddenMap[key];

    isHiddenMap[key] = isHidden;
    if (isHidden !== isHiddenOld) {
      console.log(
        `Item ${currentItem.key} hidden state changed: ${isHidden} (height: ${event.nativeEvent.layout.height})`
      );

      onRequestRender();
    }
  };

  return (
    <View
      key={currentItem.key}
      style={style}
      testID={`margin-collapsing-item-${currentItem.key}`}
    >
      <View onLayout={handleLayout}>{element}</View>
    </View>
  );
}
