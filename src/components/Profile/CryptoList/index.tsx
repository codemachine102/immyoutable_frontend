import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { Button } from '../../Button';
import { ProfileModal } from '../ProfileModal';
import { Input } from '../../Input';
import { DndList } from '../../DndList';
import { Token } from './Token';
import { TokenMobile } from './TokenMobile';
import { ModalChart } from './ModalChart';
//assets
import { cryptoAddIcon, searchIcon } from '../../../assets/icons';
//context
import { useProfile } from '../../../context';
//hooks
import { useDebounce, useDetectScroll, useWindowSize } from '../../../hooks';
//types
import { WatchListItemType } from '../../../context/profile/types';
import { screenResolutions } from '../../../constants';
import { cryptoAddImg } from '../../../assets/img';

interface WatchListItemExtendedType extends WatchListItemType {
  checked: boolean;
}

interface CryptoListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  editText?: string;
  showScrollable?: boolean;
  small?: boolean;
}

export const CryptoList: FC<CryptoListProps> = ({
  className,
  editText = 'Edit list',
  showScrollable = false,
  small = false,
}) => {
  const profile = useProfile();
  //Modal Crypto start
  const [openModalCrypto, setOpenModalCrypto] = useState<boolean>(false);
  const [modalCrypto, setModalCrypto] = useState<WatchListItemType | null>(
    null
  );
  //Modal Crypto end
  //Modal dnd start
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [searchingCrypto, setSearchingCrypto] = useState<boolean>(false);
  const [searchedCrypto, setSearchedCrypto] = useState<any>([]);
  const [defaultCrypto, setDefaultCrypto] = useState<any>([]);
  const [dndItems, setDndItems] = useState<WatchListItemExtendedType[]>([]);
  //Modal dnd end

  const debouncedSearchText = useDebounce(searchText, 500);

  const search = async (text: string) => {
    const res = await profile.getMarketInfoAll({ findBy: text });

    if (res.err) return res;
    else {
      return { err: false, data: res.data?.data?.rows };
    }
  };

  const searchCrypto = async (text: string) => {
    setSearchingCrypto(true);
    // console.log('SEARCHING CRYPTO');
    const res = await search(text);
    if (!res.err) setSearchedCrypto(res.data);
    setSearchingCrypto(false);
  };

  const searchDefaultCrypto = async (text: string) => {
    const res = await search(text);
    if (!res.err) {
      setDefaultCrypto(res.data);
    }
    // console.log('searchDefaultCrypto', res.data);
  };

  useEffect(() => {
    if (debouncedSearchText) {
      searchCrypto(debouncedSearchText);
    } else {
      setSearchedCrypto([]);
      setSearchingCrypto(false);
    }
  }, [debouncedSearchText]);

  useEffect(() => {
    searchDefaultCrypto(' ');
  }, []);

  const updateCoinsInWatchList = useCallback(async () => {
    const updatedWatchList = dndItems
      .filter((coin) => coin.checked)
      .map((coin, index) => ({ id: coin.id, order: index }));
    // console.log('updatedWatchList', updatedWatchList);
    const res = await profile.updateWatchList(updatedWatchList);
    // console.log('updateWatchList res', res);
    if (!res.err) profile.getWatchListAll();
  }, [dndItems, profile, searchedCrypto]);

  const saveList = () => {
    setOpenModal(false);
    updateCoinsInWatchList();
  };

  useEffect(() => {
    if (!profile.userWatchList) {
      profile.getWatchListAll();
    } else {
      const dndItemsWithChecked = profile.userWatchList.rows.map((coin) => ({
        ...coin,
        checked: true,
      }));
      // console.log('dndItemsWithChecked', dndItemsWithChecked);

      setDndItems(dndItemsWithChecked);
    }
  }, [profile]);

  useEffect(() => {
    setSearchText('');
  }, [openModal]);

  const size = useWindowSize();
  const ishigherSM = size.width && size.width > screenResolutions.sm;

  const CryptoListDesktop = ({
    small = false,
    showScrollable = false,
  }: {
    small?: boolean;
    showScrollable?: boolean;
  }) => {
    const scrollRef = useRef(null);

    const { isBottom, isTop, isScrollable } = useDetectScroll(scrollRef, [
      profile.userWatchList?.rows?.length,
    ]);
    return (
      <>
        <div className='cryptoList__title'>
          <h3 className='profile__subtitle'>Crypto</h3>
          <Button
            buttonType='text'
            text={editText}
            onClick={() => setOpenModal(true)}
          />
        </div>
        <div className='cryptoList__scrollContainer'>
          {showScrollable && isScrollable && (
            <>
              {!isTop && (
                <div className='cryptoList__scroll cryptoList__scroll--top' />
              )}
              {!isBottom && (
                <div className='cryptoList__scroll cryptoList__scroll--bottom' />
              )}
            </>
          )}
          <div
            className={cn('cryptoList', small && 'cryptoList--small')}
            ref={scrollRef}
          >
            {profile.userWatchList?.rows &&
              profile.userWatchList?.rows.map((elem, index) => (
                <Token
                  key={`cryptoList-${elem.id}-${index}`}
                  token={elem}
                  tokenSymbol={elem.marketInfo.symbol}
                  tokenPrice={elem.marketInfo.currentPrice}
                  setModalCrypto={setModalCrypto}
                  setOpenModalCrypto={setOpenModalCrypto}
                />
              ))}
          </div>
        </div>
      </>
    );
  };
  const CryptoListModile = ({ small = false }: { small?: boolean }) => (
    <>
      <div className={cn('cryptoList', small && 'cryptoList--small')}>
        <img
          className='cryptoList__logo cryptoList__logo--add'
          src={cryptoAddImg}
          alt='Crypto Add Coin'
          onClick={() => setOpenModal(true)}
        />
        {profile.userWatchList?.rows &&
          profile.userWatchList?.rows.map((elem, index) => (
            <TokenMobile
              key={`cryptoList-${elem.id}-${index}`}
              token={elem}
              setModalCrypto={setModalCrypto}
              setOpenModalCrypto={setOpenModalCrypto}
            />
          ))}
      </div>
    </>
  );

  return (
    <div className={cn('cryptoList__container', className)}>
      {ishigherSM ? (
        <CryptoListDesktop small={small} showScrollable={showScrollable} />
      ) : (
        <CryptoListModile small={small} />
      )}
      <ProfileModal open={openModal} handleClose={() => setOpenModal(false)}>
        <div className='cryptoList__modal cryptoList__modal--width'>
          <h2 className='auth__title'>Edit list</h2>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            label='Search cryptocurrencies'
            name='search'
            leftElement={<img src={searchIcon} alt='Search' />}
            inputClassName='cryptoList__modalInput'
          />
          <div className='cryptoList__list'>
            <DndList
              searchedCrypto={searchedCrypto}
              items={dndItems}
              setItems={setDndItems}
              searchText={searchText}
              defaultCrypto={defaultCrypto}
            />
          </div>
          <div className='cryptoList__modalBtns'>
            <Button
              buttonType='outline'
              text='Cancel'
              onClick={() => setOpenModal(false)}
              className='flex1'
            />
            <Button text='Save' onClick={saveList} className='flex1' />
          </div>
        </div>
      </ProfileModal>
      <ModalChart
        modalCrypto={modalCrypto}
        openModalCrypto={openModalCrypto}
        setOpenModalCrypto={setOpenModalCrypto}
      />
    </div>
  );
};
