import { type LayoutChangeEvent, View, type ViewStyle } from 'react-native';

import type { ItemProps, Mutable } from './types';
import { MCError } from './utils/error';

export function getMarginTop(item: ItemProps): number {
  return item.marginTop ?? item.marginVertical ?? 0;
}

export function getMarginBottom(item: ItemProps): number {
  return item.marginBottom ?? item.marginVertical ?? 0;
}

export function getPreviousValidItem<T extends ItemProps>(
  items: ArrayLike<T>,
  isExcludedMap: Record<string, boolean>,
  startIndex: number
): T | null {
  for (let i = startIndex - 1; i >= 0; i--) {
    const item = items[i]!;
    if (!isExcludedMap[item.key]) {
      return item;
    }
  }

  return null;
}

export function validateKeyUniqueness(
  items: Readonly<ArrayLike<ItemProps>>
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

type WrapElementOptions<T extends ItemProps> = {
  /** Whether margin collapsing is enabled */
  marginCollapse?: boolean;

  /** Items array containing: key and sizing data */
  items: ArrayLike<T>;

  /** Index of current item in the `items` array */
  index: number;

  /** Map of item keys to boolean indicating if the view is to be excluded from margin collapsing */
  isExcludedMap: Record<string, boolean>;

  /** Callback allowing to request the render in the parent component */
  onRequestRender: () => void;

  /** Optional style or style callback for the item wrapper */
  itemWrapperStyle?: ViewStyle | ((item: T, index: number) => ViewStyle);
};

export function wrapElement<T extends ItemProps>(
  element: React.ReactNode,
  {
    marginCollapse = true,
    items,
    index,
    isExcludedMap,
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
  if (isExcludedMap[key]) {
    style.paddingTop = 0;
    style.paddingBottom = 0;
  } else if (marginCollapse) {
    const previousItem = getPreviousValidItem(items, isExcludedMap, index);
    style.paddingTop = calculateTopMargin(currentItem, previousItem);
    style.paddingBottom = getMarginBottom(currentItem);
  } else {
    style.paddingTop = getMarginTop(currentItem);
    style.paddingBottom = getMarginBottom(currentItem);
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const isExcluded = event.nativeEvent.layout.height === 0;
    const isExcludedOld = !!isExcludedMap[key];

    isExcludedMap[key] = isExcluded;
    if (isExcluded !== isExcludedOld) {
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

function calculateTopMargin(
  item: ItemProps,
  previousItem: ItemProps | null
): number {
  const requestedMargin = getMarginTop(item);
  if (!previousItem) {
    return requestedMargin;
  }

  const otherRequestedMargin = getMarginBottom(previousItem);
  const totalMargin = Math.max(requestedMargin, otherRequestedMargin);
  return totalMargin - otherRequestedMargin;
}
