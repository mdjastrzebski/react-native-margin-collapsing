import type { MarginCollapsibleLayoutProps } from './types';

export function getMarginTop(item: MarginCollapsibleLayoutProps): number {
  return item.marginTop ?? item.marginVertical ?? 0;
}

export function getMarginBottom(item: MarginCollapsibleLayoutProps): number {
  return item.marginBottom ?? item.marginVertical ?? 0;
}
