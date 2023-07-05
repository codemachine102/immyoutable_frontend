export interface WatchListType {
  count: number;
  rows: WatchListItemType[];
}

export interface WatchListItemType {
  id: number;
  order: number;
  marketInfo: {
    image: string;
    id: number;
    name: string;
    symbol: string;
    currentPrice: number;
  };
}

export interface MarketInfoAllType {
  findBy?: string;
  exactMatch?: boolean;
}

export interface WatchListUpdateItemType {
  id: number;
  order: number;
}
