import * as React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

import type { ItemProps } from './types';
import { validateKeyUniqueness, wrapElement } from './utils';

export interface StackItem extends ItemProps {
  content?: React.ReactNode;
}

export interface StackProps extends Omit<ViewProps, 'children'> {
  /** Items to be rendered in the stack */
  items: StackItem[];

  /** Whether margin collapsing is enabled */
  marginCollapse?: boolean;

  /** Optional style or style callback for the item wrapper */
  itemWrapperStyle?:
    | ViewStyle
    | ((item: StackItem, index: number) => ViewStyle);
}

/**
 * Vertical Stack that supports margin collapsing.
 */
export function VStack({
  items,
  marginCollapse = true,
  itemWrapperStyle,
  ...restProps
}: StackProps) {
  if (__DEV__) {
    validateKeyUniqueness(items);
  }

  // Hold a map of zero-sized (hidden) items to avoid taking them into account during margin collapsing.
  const isExcludedMap = React.useRef<Record<string, boolean>>({}).current;
  const [, forceRerender] = React.useState({});

  const children = items.map((item, index) =>
    wrapElement(item.content, {
      marginCollapse,
      items,
      index,
      isExcludedMap: isExcludedMap,
      onRequestRender: () => forceRerender({}),
      itemWrapperStyle,
    })
  );

  return <View {...restProps}>{children}</View>;
}
