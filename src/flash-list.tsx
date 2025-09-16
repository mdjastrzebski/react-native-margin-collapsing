import {
  FlashList as FLFlashList,
  type FlashListProps as FLFlashListProps,
  type ListRenderItemInfo as FLListRenderItemInfo,
} from '@shopify/flash-list';
import * as React from 'react';
import type { ViewStyle } from 'react-native';

import type { ItemProps } from './types';
import { validateKeyUniqueness, wrapElement } from './utils';

export interface FlashListItem<T> extends ItemProps {
  /** Item data to be rendered */
  data: T;
}

type ListRenderItemInfo<T> = FLListRenderItemInfo<FlashListItem<T>>;

export type FlashListProps<T> = FLFlashListProps<FlashListItem<T>> & {
  /** Whether margin collapsing is enabled */
  marginCollapse?: boolean;

  /** Optional style or style callback for the item wrapper */
  itemWrapperStyle?:
    | ViewStyle
    | ((item: FlashListItem<T>, index: number) => ViewStyle);
};

/**
 * FlatList replacement that supports margin collapsing.
 * Note: `data` prop has slightly different shape than React Native's FlatList.
 */
export function FlashList<T>({
  data,
  renderItem,
  marginCollapse = true,
  itemWrapperStyle,
  ...restProps
}: FlashListProps<T>) {
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

  return <FLFlashList {...restProps} data={data} renderItem={_renderItem} />;
}
