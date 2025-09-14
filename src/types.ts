export interface MCItem {
  key: string;

  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
}

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
