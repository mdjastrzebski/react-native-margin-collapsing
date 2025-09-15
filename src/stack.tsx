import * as React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

import type { MCItem } from './types';
import { validateKeyUniqueness, wrapElement } from './utils';

export interface MCStackItem extends MCItem {
  content?: React.ReactNode;
}

export interface MCStackProps extends Omit<ViewProps, 'children'> {
  marginCollapse?: boolean;
  items: MCStackItem[];
  itemWrapperStyle?:
    | ViewStyle
    | ((item: MCStackItem, index: number) => ViewStyle);
}

export function MCStack({
  marginCollapse,
  items,
  itemWrapperStyle,
  ...restProps
}: MCStackProps) {
  if (__DEV__) {
    validateKeyUniqueness(items);
  }

  // Hold a map of zero-sized (hidden) items to avoid taking them into account during margin collapsing.
  const isHiddenMap = React.useRef<Record<string, boolean>>({}).current;
  const [, forceRerender] = React.useState({});

  const children = items.map((item, index) =>
    wrapElement(item.content, {
      marginCollapse,
      items,
      index,
      isHiddenMap,
      onRequestRender: () => forceRerender({}),
      itemWrapperStyle,
    })
  );

  return <View {...restProps}>{children}</View>;
}
