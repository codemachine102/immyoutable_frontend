import React, { FC, HTMLAttributes, useMemo } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//assets
import { profileAvatarImg } from '../../../assets/img';
import { cancelIcon, checkIcon } from '../../../assets/icons';
//context
import { useAuth } from '../../../context';
//components
import { Tooltip } from '../../Tooltip';

interface ProfileAvatarProps extends HTMLAttributes<HTMLDivElement> {
  choosenImage?: any;
  onClick?: () => void;
}
export const ProfileAvatar: FC<ProfileAvatarProps> = ({
  choosenImage,
  onClick,
}) => {
  const auth = useAuth();

  const indetityVerified = useMemo(
    () => auth.userProfile?.user?.isIdentityVerified,
    [auth?.userProfile]
  );
  // const allVerified = useMemo(
  //   () =>
  //     auth.userProfile?.user?.isIdentityVerified &&
  //     auth.userProfile?.student?.isDegreeVerified &&
  //     auth.userProfile?.user?.isPhoneVerified,
  //   [auth?.userProfile]
  // );

  return (
    <div
      className={cn(
        'profileAvatar',
        !indetityVerified && 'profileAvatar--active'
      )}
    >
      <img
        src={choosenImage || auth?.userProfile?.user?.image || profileAvatarImg}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = profileAvatarImg;
        }}
        className={cn('profileAvatar__img', onClick && 'pointer')}
        alt='Profile Avatar'
        onClick={onClick}
      />
      <Tooltip
        placement='top-start'
        tooltipContent='Verify yourself'
        containerClassName={cn('profileAvatar__check')}
        disabled={indetityVerified}
      >
        <img src={!indetityVerified ? cancelIcon : checkIcon} alt='Check' />
      </Tooltip>
    </div>
  );
};
