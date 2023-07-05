import { useState } from 'react';
//axios
import axiosApiInstance from '../../api/axios';
//types
import {
  MarketInfoAllType,
  WatchListType,
  WatchListUpdateItemType,
} from './types';

export function useProfileProvider() {
  const [userWatchList, setUserWatchList] = useState<WatchListType | null>(
    null
  );

  //////
  //Crypto Market Info START
  //////

  const getMarketInfoAll = async (values?: MarketInfoAllType) => {
    try {
      const { data } = await axiosApiInstance.post(
        'public/data/market-info/get/all/?offset=0&limit=15&order=asc',
        { ...values }
      );
      // console.log('getMarketInfoAll data', data);
      return { err: false, data: data };
    } catch (e: any) {
      // console.log('getMarketInfoAll error', e);
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const getMarketInfoById = async (id: string) => {
    try {
      const { data } = await axiosApiInstance.get(
        `public/data/market-info/get/by/id/${id}`
      );
      // console.log('getMarketInfoById data', data);
      return { err: false, data: data };
    } catch (e: any) {
      // console.log('getMarketInfoById error', e);
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  //////
  //Crypto Market Info END
  //////

  //////
  //Crypto Watch List START
  //////

  const getWatchListAll = async () => {
    try {
      const { data } = await axiosApiInstance.get(
        'private/user/watch-list/get/all/?order=asc&by=order'
      );
      // console.log('getWatchListAll data', data);
      setUserWatchList(data.data);
    } catch (e) {
      console.log('getWatchListAll error', e);
    }
  };

  const getWatchListById = async (id: number) => {
    try {
      const { data } = await axiosApiInstance.get(
        `private/user/watch-list/get/by/id/${id}`
      );
      // console.log('getWatchListById data', data);
      return { err: false, data: data };
    } catch (e: any) {
      // console.log('getWatchListById error', e);
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const addWatchList = async (id: number, order?: number) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/watch-list/add',
        {
          id,
          order,
        }
      );
      // console.log('addWatchList data', data);
      return { err: false, data: data };
    } catch (e: any) {
      // console.log('addWatchList error', e);
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const updateWatchList = async (watchListItems: WatchListUpdateItemType[]) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/watch-list/update',
        {
          watchListItems,
        }
      );
      // console.log('updateWatchList data', data);
      return { err: false, data: data };
    } catch (e: any) {
      // console.log('updateWatchList error', e);
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const deleteWatchList = async (id: number) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/watch-list/delete',
        {
          id,
        }
      );
      // console.log('deleteWatchList data', data);
      return { err: false, data: data };
    } catch (e: any) {
      // console.log('deleteWatchList error', e);
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  //////
  //Crypto Watch List END
  //////

  return {
    getMarketInfoAll,
    getMarketInfoById,
    userWatchList,
    getWatchListAll,
    getWatchListById,
    addWatchList,
    updateWatchList,
    deleteWatchList,
  };
}
