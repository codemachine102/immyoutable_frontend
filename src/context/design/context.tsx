import React from 'react';

import { useDesignProvider } from './useDesignProvider';
//types
import {
  AnimationType,
  ColorType,
  CreateCardParams,
  CreatedCardData,
  LogoType,
  MintCardParams,
  UpdateCardColorParams,
  UpdateCardLogoParams,
} from './types';
import { ErrorType } from '../types';

export interface DesignState {
  colors: ColorType[];
  colorsCount: number | null;
  activeColor: ColorType | null;
  chooseColor: (color: ColorType) => void;
  colorsLoading: boolean;
  getAllColors: () => Promise<void>;
  logos: LogoType[];
  logosCount: number | null;
  activeLogo: LogoType | null;
  chooseLogo: (logo: LogoType) => void;
  logosLoading: boolean;
  getAllLogos: () => Promise<void>;
  animations: AnimationType[];
  activeAnimation: AnimationType;
  chooseAnimation: (animation: AnimationType) => void;
  //Active Scene START
  activeScene: any;
  changeActiveScene: (scene: any) => void;
  //Active Scene END
  //Mint Card START
  createCard: ({ assetLogoId, assetColorId }: CreateCardParams) => Promise<{
    err: boolean;
    data: CreatedCardData | any;
  }>;
  updateCardLogo: ({ id, assetLogoId }: UpdateCardLogoParams) => Promise<void>;
  updateCardColor: ({
    id,
    assetColorId,
  }: UpdateCardColorParams) => Promise<void>;
  mintCard: ({ id }: MintCardParams) => Promise<{
    err: boolean;
    data: any;
  }>;
  //Mint Card END
  //Get Minted Cards START
  getMintedCards: () => Promise<void>;
  mintedCards: any;
  mintedCardsLoading: boolean;
  mintedStatus: number;
  getMintedStatus: () => Promise<void>;
  mintedStatusLoading: boolean;
  updateMintedStatus: (status: number) => void;
  //Get Minted Cards END
}

export const DesignContext = React.createContext<DesignState>(null!);

interface DesignProps {
  children: React.ReactNode;
}

export const DesignProvider = ({ children }: DesignProps) => {
  const design = useDesignProvider();

  return (
    <DesignContext.Provider value={design}>{children}</DesignContext.Provider>
  );
};
