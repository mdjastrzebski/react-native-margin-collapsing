import { type LayoutChangeEvent, View } from 'react-native';

import { DEBUG_COLORS } from './constants';
import type { ItemStyle, MCItem } from './types';
import { MCError } from './utils/error';

export function getMarginTop(item: MCItem): number {
  return item.marginTop ?? item.marginVertical ?? 0;
}

export function getMarginBottom(item: MCItem): number {
  return item.marginBottom ?? item.marginVertical ?? 0;
}

export function getPreviousNonZeroItem<T extends MCItem>(
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

export function getNextNonZeroItem<T extends MCItem>(
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

export function validateKeyUniqueness(
  items: Readonly<ArrayLike<MCItem>>
): void {
  const keySet = new Map<string, number>();
  for (let i = 0; i < items.length; i++) {
    const key = items[i]!.key;
    if (keySet.has(key)) {
      throw new MCError(
        `Duplicate key "${key}" found at index ${keySet.get(key)} and ${i}. Each item must have a unique key.`,
        validateKeyUniqueness
      );
    }

    keySet.set(key, i);
  }
}

type WrapElementOptions = {
  /** Items array containing: key and sizing data */
  items: ArrayLike<MCItem>;
  /** Index of current item in the `items` array */
  index: number;
  /** Map of item keys to boolean indicating if the view is to be hidden */
  isHiddenMap: Record<string, boolean>;
  /** Callback allowing to request the render in the parent component */
  onRequestRender: () => void;
  /** If true, applies debug colors to item backgrounds */
  debug?: boolean;
};

export function wrapElement(
  element: React.ReactNode,
  { items, index, isHiddenMap, onRequestRender, debug }: WrapElementOptions
): React.ReactNode {
  const currentItem = items[index]!;
  const key = currentItem.key;

  const style: ItemStyle = {};
  if (isHiddenMap[key]) {
    style.paddingTop = 0;
    style.paddingBottom = 0;
  } else {
    const previousItem = getPreviousNonZeroItem(items, isHiddenMap, index);
    const nextItem = getNextNonZeroItem(items, isHiddenMap, index);

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
  }

  if (debug) {
    style.backgroundColor = DEBUG_COLORS[index % DEBUG_COLORS.length];
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const isHidden = event.nativeEvent.layout.height === 0;
    const isHiddenOld = !!isHiddenMap[key];

    isHiddenMap[key] = isHidden;
    if (isHidden !== isHiddenOld) {
      if (debug) {
        console.log(
          `Item ${currentItem.key} hidden state changed: ${isHidden} (height: ${event.nativeEvent.layout.height})`
        );
      }

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
