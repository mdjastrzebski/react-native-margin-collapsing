import * as React from 'react';
import { type LayoutChangeEvent, View, type ViewProps } from 'react-native';

import { DEBUG_COLORS } from './constants';
import type { ItemStyle, MarginCollapsingItem } from './types';
import {
  getMarginBottom,
  getMarginTop,
  getNextNonZeroItem,
  getPreviousNonZeroItem,
} from './utils';

export interface MarginCollapsingContainerItem extends MarginCollapsingItem {
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
  console.log('Rendering...');
  const [, forceRerender] = React.useState({});

  const isHiddenMap = React.useRef<Record<string, boolean>>({}).current;

  const handleRerenderRequest = React.useCallback(() => {
    forceRerender({});
  }, []);

  const content = calculateChildViews(
    items,
    isHiddenMap,
    handleRerenderRequest,
    debug
  );

  return <View {...restProps}>{content}</View>;
}

function calculateChildViews(
  items: MarginCollapsingContainerItem[],
  isHiddenMap: Record<string, boolean>,
  onRequestRender: () => void,
  debug?: boolean
) {
  const content: React.ReactNode[] = [];

  for (let i = 0; i < items.length; i++) {
    const currentItem = items[i]!;
    const previousItem = getPreviousNonZeroItem(items, isHiddenMap, i);
    const nextItem = getNextNonZeroItem(items, isHiddenMap, i);

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
      style.backgroundColor = DEBUG_COLORS[i % DEBUG_COLORS.length];
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

    content.push(
      <View
        key={currentItem.key}
        style={style}
        testID={`margin-collapsing-item-${currentItem.key}`}
      >
        <View onLayout={handleLayout}>{currentItem.content}</View>
      </View>
    );
  }

  return content;
}
