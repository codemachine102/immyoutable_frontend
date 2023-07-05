import React, { FC, HTMLAttributes, useEffect, useState } from 'react';

//types
import { WatchListItemType } from '../../../context/profile/types';

interface TokenProps extends HTMLAttributes<HTMLDivElement> {
  token: WatchListItemType;
  tokenSymbol: string;
  tokenPrice: number;
  setModalCrypto: (
    value: React.SetStateAction<WatchListItemType | null>
  ) => void;
  setOpenModalCrypto: (value: React.SetStateAction<boolean>) => void;
}

export const Token: FC<TokenProps> = ({
  token,
  tokenSymbol,
  tokenPrice,
  setModalCrypto,
  setOpenModalCrypto,
}) => {
  const [price, setPrice] = useState(tokenPrice);

  const getPrice = (tokenSymbol: string) => {
    // console.log('getPrice tokenSymbol', tokenSymbol);

    const socket = new WebSocket(
      'wss://stream.binance.com:9443/ws/' +
        tokenSymbol.toLowerCase() +
        'busd@miniTicker'
    );

    socket.onmessage = (event) => {
      //   console.log('event', event);

      const ticker = JSON.parse(event.data);
      //   console.log('ticker', ticker);
      if (ticker.c) {
        setPrice(+parseFloat(ticker.c).toFixed(3));
      }
    };

    socket.onerror = (error) => {
      // console.error(error);
    };

    socket.onclose = () => {
      // console.log('Closed websocket');
    };

    return socket;
  };

  useEffect(() => {
    const socket = getPrice(tokenSymbol);
    return () => {
      socket.close();
    };
  }, [tokenSymbol]);

  return (
    <div
      className='cryptoList__item'
      onClick={() => {
        setModalCrypto({
          ...token,
          marketInfo: { ...token.marketInfo, currentPrice: price },
        });
        setOpenModalCrypto(true);
      }}
    >
      <img
        className='cryptoList__logo'
        src={token.marketInfo.image}
        alt='Crypto coin'
      />
      <span className='cryptoList__text'>${price}</span>
    </div>
  );
};
