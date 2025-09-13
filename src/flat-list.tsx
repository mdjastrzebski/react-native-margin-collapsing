import {
  FlatList,
  type FlatListProps,
  type ListRenderItem,
  type ListRenderItemInfo,
  StyleSheet,
  View,
  View,
} from 'react-native';

import { DEBUG_COLORS } from './constants';
import type { ItemStyle, MarginCollapsingItem } from './types';
import { getMarginBottom, getMarginTop } from './utils';

export interface MarginCollapsibleFlatListItem<T> extends MarginCollapsingItem {
  key: string;
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
  ...restProps
}: MarginCollapsingFlatListProps<T>) {
  const _renderItem: ListRenderItem<MarginCollapsibleFlatListItem<T>> = (
    info: ListRenderItemInfo<MarginCollapsibleFlatListItem<T>>
  ) => {
    const previousItem = data?.[info.index - 1];
    const nextItem = data?.[info.index + 1];

    const style: ItemStyle = {};
    if (!previousItem) {
      style.paddingTop = getMarginTop(info.item);
    } else {
      style.paddingTop =
        Math.max(getMarginBottom(previousItem), getMarginTop(info.item)) / 2;
    }

    if (!nextItem) {
      style.paddingBottom = getMarginBottom(info.item);
    } else {
      style.paddingBottom =
        Math.max(getMarginTop(nextItem), getMarginBottom(info.item)) / 2;
    }

    if (restProps.debug) {
      style.backgroundColor = DEBUG_COLORS[info.index % DEBUG_COLORS.length];
    }

    if (!renderItem) {
      return null;
    }

    return (
      <View style={style} testID={`margin-collapsing-item-${info.item.key}`}>
        {renderItem(info)}
      </View>
    );
  };

  return <FlatList {...restProps} data={data} renderItem={_renderItem} />;
}
