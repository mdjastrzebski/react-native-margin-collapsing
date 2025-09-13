import * as React from 'react';
import {
  FlatList,
  type FlatListProps,
  type ListRenderItem,
  type ListRenderItemInfo,
  StyleSheet,
  View,
  View,
} from 'react-native';
import type { MarginCollapsingItem } from './types';
import { validateKeyUniqueness, wrapElement } from './utils';

export interface MarginCollapsibleFlatListItem<T> extends MarginCollapsingItem {
  data: T;
}

export type MarginCollapsingFlatListProps<T> = FlatListProps<
  MarginCollapsibleFlatListItem<T>
> & {
  debug?: boolean;
};

export function MarginCollapsingFlatList<T>({
  data,
  renderItem,
  debug,
  ...restProps
}: MarginCollapsingFlatListProps<T>) {
  if (debug) {
    console.log('Rendering Container...');
  }

  if (__DEV__ && data) {
    validateKeyUniqueness(data);
  }

  // Hold a map of zero-sized (hidden) items to avoid taking them into account during margin collapsing.
  const isHiddenMap = React.useRef<Record<string, boolean>>({}).current;
  const [, forceRerender] = React.useState({});

  const _renderItem: ListRenderItem<MarginCollapsibleFlatListItem<T>> = (
    info: ListRenderItemInfo<MarginCollapsibleFlatListItem<T>>
  ) => {
    if (!renderItem || !data) {
      return null;
    }

    return wrapElement(renderItem(info), {
      items: data,
      index: info.index,
      isHiddenMap,
      onRequestRender: () => forceRerender({}),
      debug,
    });
  };

  return <FlatList {...restProps} data={data} renderItem={_renderItem} />;
}
