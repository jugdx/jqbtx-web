export interface RawCategory {
  name: string;
  savePath: string;
}

export type RawCategoriesMap = Record<string, RawCategory>;
