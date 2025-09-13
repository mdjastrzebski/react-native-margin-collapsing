import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import type { MarginCollapsingItem } from './types';
import { validateKeyUniqueness, wrapElement } from './utils';

export interface MarginCollapsingContainerItem extends MarginCollapsingItem {
  content?: React.ReactNode;
}

export interface MarginCollapsingContainerProps
  extends Omit<ViewProps, 'children'> {
  items: MarginCollapsingContainerItem[];
  debug?: boolean;
}

export function MarginCollapsingContainer({
  items,
  debug,
  ...restProps
}: MarginCollapsingContainerProps) {
  if (debug) {
    console.log('Rendering Container...');
  }

  if (__DEV__) {
    validateKeyUniqueness(items, MarginCollapsingContainer);
  }

  // Hold a map of zero-sized (hidden) items to avoid taking them into account during margin collapsing.
  const isHiddenMap = React.useRef<Record<string, boolean>>({}).current;
  const [, forceRerender] = React.useState({});

  const children = items.map((item, index) =>
    wrapElement(item.content, {
      items,
      index,
      isHiddenMap,
      onRequestRender: () => forceRerender({}),
      debug,
    })
  );

  return <View {...restProps}>{children}</View>;
}
