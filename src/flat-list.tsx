import * as React from 'react';
import {
  FlatList,
  type FlatListProps,
  type ListRenderItemInfo,
  type ViewStyle,
} from 'react-native';

import type { MCItem } from './types';
import { validateKeyUniqueness, wrapElement } from './utils';

export interface MCFlatListItem<T> extends MCItem {
  data: T;
}

type MCListRenderItemInfo<T> = ListRenderItemInfo<MCFlatListItem<T>>;

export type MCFlatListProps<T> = FlatListProps<MCFlatListItem<T>> & {
  marginCollapse?: boolean;
  itemWrapperStyle?:
    | ViewStyle
    | ((item: MCFlatListItem<T>, index: number) => ViewStyle);
};

export function MCFlatList<T>({
  data,
  renderItem,
  marginCollapse,
  itemWrapperStyle,
  ...restProps
}: MCFlatListProps<T>) {
  if (__DEV__ && data) {
    validateKeyUniqueness(data);
  }

  // Hold a map of zero-sized (hidden) items to avoid taking them into account during margin collapsing.
  const isHiddenMap = React.useRef<Record<string, boolean>>({}).current;
  const [, forceRerender] = React.useState({});

  const _renderItem = (info: MCListRenderItemInfo<T>) => {
    if (!renderItem || !data) {
      return null;
    }

    return wrapElement(renderItem(info), {
      marginCollapse,
      items: data,
      index: info.index,
      isHiddenMap,
      onRequestRender: () => forceRerender({}),
      itemWrapperStyle,
    });
  };

  return <FlatList {...restProps} data={data} renderItem={_renderItem} />;
}
