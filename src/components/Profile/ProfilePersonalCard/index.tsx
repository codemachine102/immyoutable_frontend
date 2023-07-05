import React, { FC, HTMLAttributes, useCallback, useState } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { Button } from '../../Button';
import { ProfileAvatar } from '../ProfileAvatar';
import { Tooltip } from '../../Tooltip';
//assets
import { profilePlanetBlueImg } from '../../../assets/img';
//context
import { useAuth, useMetamask } from '../../../context';
import { ROUTES } from '../../../constants';

interface ProfilePersonalCardProps extends HTMLAttributes<HTMLDivElement> {
  showUniversity?: boolean;
  className?: string;
  home?: boolean;
}

export const ProfilePersonalCard: FC<ProfilePersonalCardProps> = ({
  showUniversity = false,
  className,
  home = false,
}) => {
  const auth = useAuth();
  const meta = useMetamask();
  const navigate = useNavigate();
  // const [edit, setEdit] = useState<boolean>(true);

  const [copied, setCopied] = useState<boolean>(false);

  const handleConnectWallet = useCallback(async () => {
    if (!meta.address) {
      await meta.connectWallet();
    } else {
      meta.disconnectAndDeleteWallet();
    }
  }, [meta]);

  const substrAdr = (adr?: string) => {
    if (!adr) return;
    return (
      <>
        {adr.substring(0, 6)}...{adr.substring(adr.length - 4)}
      </>
    );
  };

  const copyToClipboard = useCallback(() => {
    if (!navigator.clipboard || !meta?.address) {
      return null;
    }

    navigator.clipboard.writeText(meta?.address).then(
      () => {
        // console.log('ok');
        setCopied(true);
      },
      (err) => {
        // console.log('not ok');
      }
    );
  }, [meta?.address]);

  const roundBalance = (balance?: string) => {
    if (balance) {
      const balanceSplit = balance.split('.');
      const afterDecimalLength =
        balanceSplit.length > 1 ? balanceSplit[1]?.length : 0;

      if (afterDecimalLength < 4) {
        return balance;
      } else {
        return Number(balance).toFixed(4).toString();
      }
    }
    return balance;
  };

  const renderWalletAddress = () => (
    <div className='profilePersonalCard__wallet'>
      <div className='profilePersonalCard__walletInfo'>
        <h4>My wallet</h4>
        <Tooltip
          placement='right'
          tooltipContent={copied ? 'Copied' : 'Copy'}
          className='profilePersonalCard__walletTooltip'
          tooltipClassName='pointer'
          onHidden={() => setCopied(false)}
          interactive
          allowHTML
        >
          <p className='pointer' onClick={copyToClipboard}>
            {substrAdr(meta?.address)}
          </p>
        </Tooltip>
      </div>
      <div className='profilePersonalCard__walletDivider' />
      <div className='profilePersonalCard__walletBalance'>
        <h4>Total balance</h4>
        <p>
          {roundBalance(meta.balance?.formatted)} {meta.balance?.symbol}
        </p>
      </div>
      <Button
        text={'Disconnect'}
        className='profilePersonalCard__btn'
        color='blue'
        buttonType='text'
        onClick={handleConnectWallet}
      />
    </div>
  );

  const goToProfile = () => {
    navigate(ROUTES.profile);
  };

  return (
    <div className={cn('profilePersonalCard', className)}>
      <ProfileAvatar onClick={home ? goToProfile : undefined} />
      <div className='profilePersonalCard__text'>
        <h3
          onClick={home ? goToProfile : undefined}
          className={cn(home && 'pointer')}
        >
          {auth?.userProfile?.user?.firstName}{' '}
          {auth?.userProfile?.user?.lastName}
        </h3>
        {showUniversity && (
          <ul className='profilePersonalCard__list'>
            <li>
              <img src={profilePlanetBlueImg} alt='Profile Planet' />
              <span>High Point University - 2020</span>
            </li>
          </ul>
        )}
      </div>
      {meta.address ? (
        renderWalletAddress()
      ) : (
        // !mini &&
        <Button
          text={'Connect Wallet'}
          className='profilePersonalCard__btn'
          onClick={handleConnectWallet}
          loading={meta.isAccountConnecting || meta.isAccountReconecting}
        />
      )}
    </div>
  );
};
