import * as React from 'react';
import {
  FlatList as RNFlatList,
  type FlatListProps as RNFlatListProps,
  type ListRenderItemInfo as RNListRenderItemInfo,
  type ViewStyle,
} from 'react-native';

import type { ItemProps } from './types';
import { validateKeyUniqueness, wrapElement } from './utils';

export interface FlatListItem<T> extends ItemProps {
  /** Item data to be rendered */
  data: T;
}

type ListRenderItemInfo<T> = RNListRenderItemInfo<FlatListItem<T>>;

export type FlatListProps<T> = RNFlatListProps<FlatListItem<T>> & {
  /** Whether margin collapsing is enabled */
  marginCollapse?: boolean;

  /** Optional style or style callback for the item wrapper */
  itemWrapperStyle?:
    | ViewStyle
    | ((item: FlatListItem<T>, index: number) => ViewStyle);
};

/**
 * FlatList replacement that supports margin collapsing.
 * Note: `data` prop has slightly different shape than React Native's FlatList.
 */
export function FlatList<T>({
  data,
  renderItem,
  marginCollapse = true,
  itemWrapperStyle,
  ...restProps
}: FlatListProps<T>) {
  if (__DEV__ && data) {
    validateKeyUniqueness(data);
  }

  // Hold a map of zero-sized (hidden) items to avoid taking them into account during margin collapsing.
  const isHiddenMap = React.useRef<Record<string, boolean>>({}).current;
  const [, forceRerender] = React.useState({});

  const _renderItem = (info: ListRenderItemInfo<T>) => {
    if (!renderItem || !data) {
      return null;
    }

    return wrapElement(renderItem(info), {
      marginCollapse,
      items: data,
      index: info.index,
      isExcludedMap: isHiddenMap,
      onRequestRender: () => forceRerender({}),
      itemWrapperStyle,
    });
  };

  return <RNFlatList {...restProps} data={data} renderItem={_renderItem} />;
}
