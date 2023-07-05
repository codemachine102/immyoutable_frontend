import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { SwipeButton } from '../../SwipeButton';
import { ProfileModal } from '../../Profile';
import { Button } from '../../Button';
import { MintLoader } from '../MintLoader';
//assets
import { checkIcon } from '../../../assets/icons';
//context
import { useDesign, useMetamask } from '../../../context';

interface DesignMintProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
}

export const DesignMint: FC<DesignMintProps> = ({ className, onSuccess }) => {
  const meta = useMetamask();
  const design = useDesign();
  const [reset, setReset] = useState<number>(0);
  const [openModalMinting, setOpenModalMinting] = useState<boolean>(false);
  // const [showWarning, setShowWarning] = useState<boolean>(true);
  const [widthLoading, setWidthLoading] = useState<number>(0);
  const [widthLoadingInterval, setWidthLoadingInterval] = useState<any>(null);
  const [disabled, setDisabled] = useState(true);
  const [minted, setMinted] = useState(false);
  const [error, setError] = useState('');
  const [modalStep, setModalStep] = useState<number>(1);

  const FULL_LOADING = 100;

  const swipeComplete = () => {
    setOpenModalMinting(true);
  };

  const closeModal = () => {
    setOpenModalMinting(false);
    setTimeout(() => {
      setModalStep(1);
      setReset((counter) => counter + 1);
      setWidthLoading(0);
      clearInterval(widthLoadingInterval);
    }, 200);
    setError('');
    setMinted(false);
  };

  const startLoadingToPercentage = (
    currentPerc: number,
    percToLoad: number
  ) => {
    var completePercentage = currentPerc;
    setWidthLoading(completePercentage);
    const interval = setInterval(() => {
      if (currentPerc < percToLoad) {
        completePercentage = completePercentage + 10;
        setWidthLoading(completePercentage);
      } else {
        clearInterval(interval);
      }
    }, 400);
    setWidthLoadingInterval(interval);
    return interval;
  };

  const startMinting = useCallback(async () => {
    if (design.activeLogo?.id && design.activeColor?.id) {
      const firstInterval = startLoadingToPercentage(0, FULL_LOADING / 2);
      const resCreated = await design.createCard({
        assetLogoId: design.activeLogo?.id,
        assetColorId: design.activeColor?.id,
      });
      if (!resCreated.err && resCreated?.data?.id) {
        setWidthLoading(FULL_LOADING / 2);
        clearInterval(firstInterval);
        const secontInterval = startLoadingToPercentage(
          FULL_LOADING / 2,
          FULL_LOADING
        );
        const resMinted = await design.mintCard({ id: resCreated.data.id });
        if (!resMinted.err) {
          setMinted(true);
          setError('');
          design.updateMintedStatus(0);
          design.getMintedStatus();
        } else {
          setError(resMinted.data?.message);
        }
        setWidthLoading(FULL_LOADING);
        clearInterval(secontInterval);
      } else {
        clearInterval(firstInterval);
        setError(resCreated?.data?.message);
      }
    }
  }, [design]);

  useEffect(() => {
    setDisabled(design.activeLogo === null);
  }, [design.activeLogo]);

  const walletAddress = useMemo(
    () => meta?.cryptoAccount?.address,
    [meta?.cryptoAccount]
  );

  const WarningWallet = () => (
    <>
      <h2 className='auth__title mt32 mb32'>Warning!</h2>
      <p className='auth__subtitle'>
        Please confirm that this is your wallet address: {walletAddress}
      </p>
      <Button
        text='Yes'
        onClick={() => {
          setModalStep((prev) => prev + 1);
        }}
        className='designMint__mintBtn mt32'
      />
    </>
  );

  const WarningError = () => (
    <>
      <h2 className='auth__title mt32 mb32'>Error</h2>
      <p className='auth__subtitle'>Please connect your wallet first</p>
      <Button
        text='OK'
        onClick={closeModal}
        className='designMint__mintBtn mt32'
      />
    </>
  );

  const WarningMinting = () => (
    <>
      <h2 className='auth__title mb32'>Warning!</h2>
      <div className='designMint__modalContainer'>
        <p className='designMint__modalText mb32'>
          Before you proceed with the minting process, please be aware that this
          action will initiate a smart contract which will mint your token,
          freeze the metadata, and transfer it to your wallet. This process is
          irreversible and cannot be undone. By proceeding, you consent your
          understanding that your credentials will be tokenized into an
          immyoutable record via the Blockchain.
        </p>
        <div className='designMint__modalButtons'>
          <Button
            buttonType='outline'
            text='Cancel'
            onClick={closeModal}
            className='flex1'
          />
          <Button
            text='Confirm'
            onClick={() => {
              setModalStep((prev) => prev + 1);
              startMinting();
            }}
            className='flex1'
          />
        </div>
      </div>
    </>
  );

  return (
    <div className={cn('designMint', className)}>
      <SwipeButton
        mainText='Slide to Mint'
        overlayText='Mint'
        onSwipeDone={swipeComplete}
        reset={reset}
        className='designMint__slide'
        containerClassName='designMint__slideContainer'
        disabled={disabled}
      />
      <div className='designMint__available'>Tokens available: 1</div>
      <ProfileModal
        open={openModalMinting}
        handleClose={closeModal}
        className='designMint__modal'
      >
        {modalStep === 1 ? (
          walletAddress ? (
            <WarningWallet />
          ) : (
            <WarningError />
          )
        ) : modalStep === 2 ? (
          <WarningMinting />
        ) : (
          <>
            {error ? (
              <>
                <h2 className='auth__title mt32 mb32'>Error</h2>
                <p className='auth__subtitle'>{error}</p>
                <Button
                  text='OK'
                  onClick={closeModal}
                  className='designMint__mintBtn mt32'
                />
              </>
            ) : !minted ? (
              <>
                <div className='designMint__mint'>
                  <MintLoader
                    widthLoading={widthLoading}
                    className='designMint__mintLoader'
                  />
                  <div className='designMint__mintLogo'>
                    <img src={design.activeLogo?.image} alt='Mint Logo' />
                  </div>
                </div>
                <h2 className='auth__title mt32 mb16'>Minting...</h2>
                <span className='designMint__mintLoading'>{widthLoading}%</span>
              </>
            ) : (
              <>
                <div className='designMint__mint'>
                  <img
                    src={checkIcon}
                    alt='Mint Planet'
                    className='designMint__mintSuccess'
                  />
                </div>
                <h2 className='auth__title mt32 mb32'>Success</h2>
                <p className='auth__subtitle'>
                  Hey! The minting process may take some time. After it is
                  completed, the NFT will be available in your profile
                </p>
                <Button
                  text='OK'
                  onClick={closeModal}
                  className='designMint__mintBtn mt32'
                />
              </>
            )}
          </>
        )}
      </ProfileModal>
    </div>
  );
};
