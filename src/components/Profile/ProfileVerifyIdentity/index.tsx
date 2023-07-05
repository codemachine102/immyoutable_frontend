import React, { FC, HTMLAttributes, useEffect, useState } from 'react';

//styles
import './styles.scss';
//components
import { ProfileModal } from '../ProfileModal';
import { ProfileVerifyButton } from '../ProfileVerifyButton';
import { ProfileSumsub } from '../ProfileSumsub';
//context
import { useAuth } from '../../../context';

interface ProfileVerifyIdentityProps extends HTMLAttributes<HTMLDivElement> {
  isAproved?: boolean;
}

export const ProfileVerifyIdentity: FC<ProfileVerifyIdentityProps> = ({
  isAproved = false,
}) => {
  const auth = useAuth();
  const [openModalIdentity, setOpenModalIdentity] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModalIdentity(false);
    auth.getUserFn();
  };

  return (
    <div className='profileVerifyIdentity'>
      <ProfileVerifyButton
        text='Identity'
        onClick={() => setOpenModalIdentity(true)}
        isAproved={isAproved}
      />
      <ProfileModal
        open={openModalIdentity}
        handleClose={closeModal}
        modalClassName='profileVerifyIdentity__modal'
      >
        <h2 className='auth__title mb32'>Verify identity</h2>
        <ProfileSumsub />
      </ProfileModal>
    </div>
  );
};
