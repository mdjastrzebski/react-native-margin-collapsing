import { type LayoutChangeEvent, View, type ViewStyle } from 'react-native';

import type { MCItem, Mutable } from './types';
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

type WrapElementOptions<T extends MCItem> = {
  /** Items array containing: key and sizing data */
  items: ArrayLike<T>;
  /** Index of current item in the `items` array */
  index: number;
  /** Map of item keys to boolean indicating if the view is to be hidden */
  isHiddenMap: Record<string, boolean>;
  /** Callback allowing to request the render in the parent component */
  onRequestRender: () => void;

  itemWrapperStyle?: ViewStyle | ((item: T, index: number) => ViewStyle);
};

export function wrapElement<T extends MCItem>(
  element: React.ReactNode,
  {
    items,
    index,
    isHiddenMap,
    onRequestRender,
    itemWrapperStyle,
  }: WrapElementOptions<T>
): React.ReactNode {
  const currentItem = items[index]!;
  const key = currentItem.key;

  const baseStyle =
    typeof itemWrapperStyle === 'function'
      ? itemWrapperStyle(currentItem, index)
      : itemWrapperStyle;

  const style: Mutable<ViewStyle> = { ...baseStyle };
  if (isHiddenMap[key]) {
    style.paddingTop = 0;
    style.paddingBottom = 0;
  } else {
    const previousItem = getPreviousNonZeroItem(items, isHiddenMap, index);
    const nextItem = getNextNonZeroItem(items, isHiddenMap, index);

    style.paddingTop = calculateTopMargin(currentItem, previousItem);
    style.paddingBottom = calculateBottomMargin(currentItem, nextItem);
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const isHidden = event.nativeEvent.layout.height === 0;
    const isHiddenOld = !!isHiddenMap[key];

    isHiddenMap[key] = isHidden;
    if (isHidden !== isHiddenOld) {
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

function calculateTopMargin(item: MCItem, previousItem: MCItem | null): number {
  if (!previousItem) {
    return getMarginTop(item);
  }

  const selfMargin = getMarginTop(item);
  const otherMargin = getMarginBottom(previousItem);

  const effectiveMargin = Math.max(selfMargin, otherMargin);
  const totalMargin = selfMargin + otherMargin;
  return Math.round((effectiveMargin * selfMargin) / totalMargin);
}

function calculateBottomMargin(item: MCItem, nextItem?: MCItem | null): number {
  if (!nextItem) {
    return getMarginBottom(item);
  }

  const effectiveMargin = Math.max(
    getMarginBottom(item),
    getMarginTop(nextItem)
  );
  return effectiveMargin - calculateTopMargin(nextItem, item);
}
