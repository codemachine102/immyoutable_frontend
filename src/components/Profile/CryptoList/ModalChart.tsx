import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

//types
import { Button } from '../../Button';
import { ProfileModal } from '../ProfileModal';
import { SpinnerLoader } from '../../SpinnerLoader';
//types
import { WatchListItemType } from '../../../context/profile/types';
//context
import { useProfile } from '../../../context';

interface ModalChartProps extends HTMLAttributes<HTMLDivElement> {
  modalCrypto: WatchListItemType | null;
  openModalCrypto: boolean;
  setOpenModalCrypto: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalChart: FC<ModalChartProps> = ({
  modalCrypto,
  openModalCrypto,
  setOpenModalCrypto,
}) => {
  const profile = useProfile();
  //Chart Start
  const [modalCryptoChart, setModalCryptoChart] = useState<any>([]);
  const [modalCryptoChartLoading, setModalCryptoChartLoading] =
    useState<boolean>(false);
  const [modalCryptoChartError, setModalCryptoChartError] =
    useState<boolean>(false);
  //Chart End

  const [price, setPrice] = useState(modalCrypto?.marketInfo.currentPrice);

  const getCoinById = async (coin: WatchListItemType) => {
    setModalCryptoChartLoading(true);
    setModalCryptoChartError(false);
    const res = await profile.getWatchListById(coin.id);
    console.log('getCoinById res', res);
    if (!res.err) {
      setModalCryptoChart(res.data?.data?.chartData || []);
    }
    setModalCryptoChartError(res.err);
    setModalCryptoChartLoading(false);
  };

  useEffect(() => {
    if (modalCrypto) {
      getCoinById(modalCrypto);
    }
  }, [modalCrypto]);

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

    socket.onopen = (event) => {
      //   console.log('Open websocket', event);
    };

    socket.onerror = (error) => {
      //   console.error(error);
    };

    socket.onclose = () => {
      //   console.log('Closed websocket');
    };

    return socket;
  };

  useEffect(() => {
    if (modalCrypto?.marketInfo.symbol) {
      // console.log('START SOCKET');
      const socket = getPrice(modalCrypto?.marketInfo.symbol);
      return () => {
        socket.close();
      };
    }
  }, [modalCrypto?.marketInfo.symbol]);

  useEffect(() => {
    setPrice(modalCrypto?.marketInfo.currentPrice);
  }, [modalCrypto?.marketInfo.currentPrice]);

  return (
    <ProfileModal
      open={openModalCrypto}
      handleClose={() => setOpenModalCrypto(false)}
    >
      <div className='cryptoList__modal align-center'>
        <h2 className='auth__title cryptoList__modalTitle'>
          {modalCrypto?.marketInfo.name}{' '}
          <div className='cryptoList__modalSlug'>
            <span>{modalCrypto?.marketInfo.symbol}</span>
          </div>
        </h2>
        <div className='cryptoList__modalPrice'>${price}</div>
        {!modalCryptoChartError && (
          <div className='cryptoList__modalChart'>
            {!modalCryptoChartLoading ? (
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart width={240} height={106} data={modalCryptoChart}>
                  <Line
                    type='monotone'
                    dataKey='price'
                    stroke='#18A0FB'
                    strokeWidth={1}
                    dot={false}
                    className='cryptoList__modalChartLine'
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className='cryptoList__modalChartLoader'>
                <SpinnerLoader />
              </div>
            )}
          </div>
        )}
        <div className='cryptoList__modalDays'>Last 30 days</div>
        <div className='cryptoList__modalBtns'>
          <Button
            text='OK'
            onClick={() => setOpenModalCrypto(false)}
            className='flex1'
          />
        </div>
      </div>
    </ProfileModal>
  );
};
