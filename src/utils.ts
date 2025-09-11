import type { MarginCollapsingItem } from './types';

export function getMarginTop(item: MarginCollapsingItem): number {
  return item.marginTop ?? item.marginVertical ?? 0;
}

export function getMarginBottom(item: MarginCollapsingItem): number {
  return item.marginBottom ?? item.marginVertical ?? 0;
}
