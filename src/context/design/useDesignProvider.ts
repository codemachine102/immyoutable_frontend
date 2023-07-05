import { useCallback, useEffect, useState } from 'react';
//axios
import axiosApiInstance from '../../api/axios';
//types
import {
  AnimationType,
  ColorType,
  CreateCardParams,
  CreatedCardData,
  CreatedCardResult,
  LogoType,
  MintCardParams,
  UpdateCardColorParams,
  UpdateCardLogoParams,
} from './types';
//context
import { useAuth } from '..';

export function useDesignProvider() {
  const auth = useAuth();
  //Colors START
  const [colors, setColors] = useState<ColorType[]>([]);
  const [colorsCount, setColorsCount] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState<ColorType | null>(null);
  const [colorsLoading, setColorsLoading] = useState(false);
  //Colors END => Logos START
  const [logos, setLogos] = useState<LogoType[]>([]);
  const [logosCount, setLogosCount] = useState<number | null>(null);
  const [activeLogo, setActiveLogo] = useState<LogoType | null>(null);
  const [logosLoading, setLogosLoading] = useState(false);
  //Logos END => Animations START
  const [animations] = useState<AnimationType[]>(['']);
  const [activeAnimation, setActiveAnimation] = useState<AnimationType>(
    animations[0]
  );
  //Animations END
  //Minting START
  const [mintedCards, setMintedCards] = useState<any[]>([]);
  const [mintedCardsLoading, setMintedCardsLoading] = useState<boolean>(false);
  const [mintedStatus, setMintedStatus] = useState<number>(0);
  const [mintedStatusLoading, setMintedStatusLoading] =
    useState<boolean>(false);
  //Minting END

  const chooseColor = (color: ColorType) => {
    setActiveColor(color);
  };
  const chooseLogo = (logo: LogoType) => {
    setActiveLogo(logo);
  };
  const chooseAnimation = (animation: AnimationType) => {
    setActiveAnimation(animation);
  };

  const getAllColors = async () => {
    try {
      setColorsLoading(true);
      const { data } = await axiosApiInstance.get(
        'private/common/studio/data/colors/get/all'
      );
      // console.log('getAllColors data', data);
      if (data?.success && data?.data?.rows) {
        setColors(data?.data?.rows.reverse());
        setColorsCount(data?.data?.count);
        setActiveColor(data?.data?.rows[0]);
      }
      setColorsLoading(false);
    } catch (e) {
      console.log('getAllColors error', e);
      setColorsLoading(false);
    }
  };

  const getAllLogos = async () => {
    try {
      setLogosLoading(true);
      const { data } = await axiosApiInstance.get(
        'private/common/studio/data/logos/get/all'
      );
      console.log('getAllLogos data', data);
      if (data?.success && data?.data?.rows) {
        setLogos(data?.data?.rows.reverse());
        setLogosCount(data?.data?.count);
        // setActiveLogo(data?.data?.rows[0]);
      }
      setLogosLoading(false);
    } catch (e) {
      console.log('getAllLogos error', e);
      setLogosLoading(false);
    }
  };

  //Delete all colors end logos when user logout
  useEffect(() => {
    if (!auth.token) {
      setColors([]);
      setColorsCount(null);
      setLogos([]);
      setLogosCount(null);
    }
  }, [auth.token]);

  //Active Scene START
  const [activeScene, setActiveScene] = useState<any>(null);

  const changeActiveScene = (scene: any) => {
    setActiveScene(scene);
  };
  //Active Scene END

  //Mint Card START
  // const [createdCard, setCreatedCard] = useState(null);

  //Create card before minting
  const createCard = async ({
    assetLogoId,
    assetColorId,
  }: CreateCardParams) => {
    try {
      const { data }: { data: CreatedCardResult } = await axiosApiInstance.post(
        'private/user/studio/projects/create',
        { assetLogoId, assetColorId }
      );

      console.log('createCard data', data);
      return { err: !data?.success, data: data?.data };
    } catch (e: any) {
      console.log('createCard error', e);
      return { err: true, data: e?.response?.data || e };
    }
  };

  //Update logo of created card by ID before minting
  const updateCardLogo = async ({ id, assetLogoId }: UpdateCardLogoParams) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/studio/projects/update/logo',
        { id, assetLogoId }
      );
      console.log('updateCardLogo data', data);
      if (data?.success) {
        // do something with data.data
      }
    } catch (e) {
      console.log('updateCardLogo error', e);
    }
  };

  //Update color of created card by ID before minting
  const updateCardColor = async ({
    id,
    assetColorId,
  }: UpdateCardColorParams) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/studio/projects/update/color',
        { id, assetColorId }
      );
      console.log('updateCardColor data', data);
      if (data?.success) {
        // do something with data.data
      }
    } catch (e) {
      console.log('updateCardColor error', e);
    }
  };

  //Mint created card by ID of this card
  const mintCard = async ({ id }: MintCardParams) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/studio/projects/mint',
        { id }
      );
      console.log('mintCard data', data);
      return { err: !data?.success, data: data?.data };
    } catch (e: any) {
      console.log('mintCard error', e);
      return { err: true, data: e?.response?.data || e };
    }
  };
  //Mint Card END

  //Get Minted Cards START
  const getMintedCards = useCallback(async () => {
    if (mintedCardsLoading) return;
    try {
      setMintedCardsLoading(true);
      const { data } = await axiosApiInstance.get(
        'private/user/studio/nfts/get/all/?offset=0&limit=15&order=asc'
      );
      console.log('getMintedCards data', data);
      if (data?.success) {
        setMintedCards(data?.data?.rows);
      }
      setMintedCardsLoading(false);
    } catch (e) {
      console.log('getMintedCards error', e);
      setMintedCardsLoading(false);
    }
  }, [mintedCardsLoading]);

  const getMintedStatus = useCallback(async () => {
    try {
      setMintedStatusLoading(true);
      const { data } = await axiosApiInstance.get(
        'private/user/studio/nfts/get/status/minted'
      );
      console.log('getMintedStatus data', data);

      setMintedStatusLoading(false);
      if (data?.success && data?.data?.minted) {
        updateMintedStatus(data?.data?.minted);
      }
    } catch (e) {
      setMintedStatusLoading(false);
      updateMintedStatus(0);
      console.log('getMintedStatus error', e);
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      getMintedCards();
      getMintedStatus();
    }
  }, [auth.token]);

  const updateMintedStatus = (status: number) => {
    if (!isNaN(status)) {
      setMintedStatus(status);
    }
  };
  //Get Minted Cards END

  return {
    colors,
    colorsCount,
    activeColor,
    chooseColor,
    colorsLoading,
    getAllColors,
    logos,
    logosCount,
    activeLogo,
    chooseLogo,
    logosLoading,
    getAllLogos,
    animations,
    activeAnimation,
    chooseAnimation,
    activeScene,
    changeActiveScene,
    createCard,
    updateCardLogo,
    updateCardColor,
    mintCard,
    getMintedCards,
    mintedCards,
    mintedCardsLoading,
    mintedStatus,
    getMintedStatus,
    mintedStatusLoading,
    updateMintedStatus,
  };
}
