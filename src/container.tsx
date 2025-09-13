import { StyleSheet, View, type ViewProps } from 'react-native';

import type { ItemStyle, MarginCollapsibleLayoutProps } from './types';
import { getMarginBottom, getMarginTop } from './utils';

export interface MarginCollapsingItem extends MarginCollapsibleLayoutProps {
  key: string;
  content?: React.ReactNode;
}

export interface MarginCollapsingContainerProps
  extends Omit<ViewProps, 'children'> {
  items: MarginCollapsingItem[];
  debug?: boolean;
}

export function MarginCollapsingContainer({
  items,
  debug,
  ...restProps
}: MarginCollapsingContainerProps) {
  return <View {...restProps}>{calculateChildViews(items, debug)}</View>;
}

function calculateChildViews(
  items: MarginCollapsingItem[],
  debug?: boolean
): React.ReactNode[] {
  const result: React.ReactNode[] = [];

  for (let i = 0; i < items.length; i++) {
    const previousItem = items[i - 1];
    const currentItem = items[i]!;
    const nextItem = items[i + 1];

    const style: ItemStyle = {};
    if (!previousItem) {
      style.paddingTop = getMarginTop(currentItem);
    } else {
      style.paddingTop =
        Math.max(getMarginBottom(previousItem), getMarginTop(currentItem)) / 2;
    }

    if (!nextItem) {
      style.paddingBottom = getMarginBottom(currentItem);
    } else {
      style.paddingBottom =
        Math.max(getMarginTop(nextItem), getMarginBottom(currentItem)) / 2;
    }

    if (debug) {
      style.backgroundColor =
        i % 2 === 0
          ? styles.debugItem.backgroundColor
          : styles.debugItemAlt.backgroundColor;
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

const styles = StyleSheet.create({
  debugItem: {
    backgroundColor: 'orange',
  },
  debugItemAlt: {
    backgroundColor: 'lightblue',
  },
});
