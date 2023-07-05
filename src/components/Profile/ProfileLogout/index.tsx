import React, { useState } from 'react';

//styles
import './styles.scss';
//components
import { Button } from '../../Button';
import { ProfileLogoutModal } from '../ProfileLogoutModal';

export const ProfileLogout = () => {
  const [openModalLogout, setOpenModalLogout] = useState<boolean>(false);

  return (
    <div className='profileLogout'>
      <Button
        text='Log out'
        onClick={() => setOpenModalLogout(true)}
        buttonType='text'
        className='mt24 profileLogout__btn'
      />
      <ProfileLogoutModal
        openModalLogout={openModalLogout}
        setOpenModalLogout={setOpenModalLogout}
      />
    </div>
  );
};
