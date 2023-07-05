import React from 'react';

import { useProfileProvider } from './useProfileProvider';
//types
import {
  MarketInfoAllType,
  WatchListType,
  WatchListUpdateItemType,
} from './types';
import { ResponseType } from '../types';

export interface ProfileState {
  getMarketInfoAll: (values: MarketInfoAllType) => Promise<ResponseType>;
  getMarketInfoById: (id: string) => Promise<ResponseType>;
  userWatchList: WatchListType | null;
  getWatchListAll: () => Promise<void>;
  getWatchListById: (id: number) => Promise<ResponseType>;
  addWatchList: (id: number, order?: number) => Promise<ResponseType>;
  updateWatchList: (
    watchListItems: WatchListUpdateItemType[]
  ) => Promise<ResponseType>;
  deleteWatchList: (id: number) => Promise<ResponseType>;
}

export const ProfileContext = React.createContext<ProfileState>(null!);

interface ProfileProps {
  children: React.ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProps) => {
  const profile = useProfileProvider();

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};
