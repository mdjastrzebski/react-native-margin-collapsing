import type { MarginCollapsingItem } from './types';

export function getMarginTop(item: MarginCollapsingItem): number {
  return item.marginTop ?? item.marginVertical ?? 0;
}

export function getMarginBottom(item: MarginCollapsingItem): number {
  return item.marginBottom ?? item.marginVertical ?? 0;
}

export function getPreviousNonZeroItem<T extends MarginCollapsingItem>(
  items: T[],
  isHiddenMap: Record<string, boolean>,
  startIndex: number
): T | null {
  for (let i = startIndex - 1; i >= 0; i--) {
    const item = items[i]!;
    if (!isHiddenMap[item.key]) {
      return item;
    }
  }

  return null;
}

export function getNextNonZeroItem<T extends MarginCollapsingItem>(
  items: T[],
  isHiddenMap: Record<string, boolean>,
  startIndex: number
): T | null {
  for (let i = startIndex + 1; i < items.length; i++) {
    const item = items[i]!;
    if (!isHiddenMap[item.key]) {
      return item;
    }
  }

  return null;
}

export function validateKeyUniqueness(items: MarginCollapsingItem[]): void {
  const keySet = new Set<string>();
  items.forEach((item) => {
    const key = item.key;
    if (keySet.has(key)) {
      throw new Error(
        `Duplicate key "${key}" found in MarginCollapsingContainer items. Keys should be unique to ensure proper behavior.`
      );
    }

    keySet.add(key);
  });
}
