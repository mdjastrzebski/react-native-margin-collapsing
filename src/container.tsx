import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import type { MarginCollapsingItem } from './types';
import { wrapElement } from './utils';

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
  console.log('Rendering Container...');
  const [, forceRerender] = React.useState({});
  const isHiddenMap = React.useRef<Record<string, boolean>>({}).current;

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
