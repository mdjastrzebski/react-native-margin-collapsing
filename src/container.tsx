import { View } from 'react-native';
import type {
  ItemStyle,
  MarginCollapsingContainerProps,
  MarginCollapsingItem,
} from './types';
import { getMarginBottom, getMarginTop } from './utils';

export function MarginCollapsingContainer({
  items,
  ...restProps
}: MarginCollapsingContainerProps) {
  return <View {...restProps}>{calculateChildViews(items)}</View>;
}

function calculateChildViews(items: MarginCollapsingItem[]): React.ReactNode[] {
  const result: React.ReactNode[] = [];

  for (let i = 0; i < items.length; i++) {
    const previousItem = items[i - 1];
    const currentItem = items[i]!;
    const nextItem = items[i + 1];

    const style: ItemStyle = {};
    if (!previousItem) {
      style.marginTop = getMarginTop(currentItem);
    } else {
      style.marginTop =
        Math.max(getMarginBottom(previousItem), getMarginTop(currentItem)) / 2;
    }

    if (!nextItem) {
      style.marginBottom = getMarginBottom(currentItem);
    } else {
      style.marginBottom =
        Math.max(getMarginTop(nextItem), getMarginBottom(currentItem)) / 2;
    }

    result.push(
      <View
        key={currentItem.key}
        style={style}
        testID={`margin-collapsing-item-${currentItem.key}`}
      >
        {currentItem.content}
      </View>
    );
  }

  return result;
}
