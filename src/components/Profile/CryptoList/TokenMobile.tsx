import React, { FC, HTMLAttributes } from 'react';

//types
import { WatchListItemType } from '../../../context/profile/types';

interface TokenMobileProps extends HTMLAttributes<HTMLDivElement> {
  token: WatchListItemType;
  setModalCrypto: (
    value: React.SetStateAction<WatchListItemType | null>
  ) => void;
  setOpenModalCrypto: (value: React.SetStateAction<boolean>) => void;
}

export const TokenMobile: FC<TokenMobileProps> = ({
  token,
  setModalCrypto,
  setOpenModalCrypto,
}) => {
  return (
    <div
      className='cryptoList__item'
      onClick={() => {
        setModalCrypto(token);
        setOpenModalCrypto(true);
      }}
    >
      <img
        className='cryptoList__logo'
        src={token.marketInfo.image}
        alt='Crypto coin'
      />
    </div>
  );
};
