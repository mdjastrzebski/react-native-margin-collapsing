import * as React from 'react';
import { View, type ViewProps } from 'react-native';

import type { MCItem } from './types';
import { validateKeyUniqueness, wrapElement } from './utils';

export interface MCStackItem extends MCItem {
  content?: React.ReactNode;
}

export interface MCStackProps extends Omit<ViewProps, 'children'> {
  items: MCStackItem[];
  debug?: boolean;
}

export function MCStack({ items, debug, ...restProps }: MCStackProps) {
  if (debug) {
    console.log('Rendering Stack...');
  }

  if (__DEV__) {
    validateKeyUniqueness(items);
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
