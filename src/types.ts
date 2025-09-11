import type React from 'react';
import type { ViewProps } from 'react-native';

export interface MarginCollapsingItem {
  key: string;
  content?: React.ReactNode;

  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
}

export interface MarginCollapsingContainerProps extends ViewProps {
  items: MarginCollapsingItem[];
  children?: never;
}

export interface ItemStyle {
  marginTop?: number;
  marginBottom?: number;
}
