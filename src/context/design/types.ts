export type ColorType = {
  assetTheme: {
    color: string;
    emissive: string;
    id: number;
    isEnabled: boolean;
    metalness: string;
    roughness: string;
    theme: string;
  };
  assetThemeId: number;
  color: string;
  gradient: string;
  id: number;
  isEnabled: boolean;
  title: string;
};

export type LogoType = {
  id: number;
  image: string;
  isEnabled: boolean;
  model: string;
};

export type AnimationType = string;

export type CreateCardParams = {
  assetLogoId: number;
  assetColorId: number;
};

export type UpdateCardLogoParams = {
  id: number;
  assetLogoId: number;
};

export type UpdateCardColorParams = {
  id: number;
  assetColorId: number;
};

export type MintCardParams = {
  id: number;
};

export type CreatedCardResult = {
  success: boolean;
  message: string;
  data: CreatedCardData;
};

export type CreatedCardData = {
  id: number;
  assetColorId: number;
  assetLogoId: number;
  studentName: string | null;
  universityName: string | null;
  degreeName: string | null;
  classInfo: string | null;
  isMinted: boolean;
  mintedAt: string | null;
  assetColor?: ColorType;
  assetLogo?: LogoType;
};
