import React, { FC, HTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { ProfileModal } from '../ProfileModal';
import { Button } from '../../Button';
//context
import { useAuth } from '../../../context';
//constants
import { ROUTES } from '../../../constants';

interface ProfileLogoutModalProps extends HTMLAttributes<HTMLDivElement> {
  openModalLogout: boolean;
  setOpenModalLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileLogoutModal: FC<ProfileLogoutModalProps> = ({
  openModalLogout,
  setOpenModalLogout,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const logOut = async () => {
    setLoading(true);
    const res = await auth.logOut('current');
    setLoading(false);

    if (!res.err) {
      setOpenModalLogout(false);
      // setTimeout(() => {
      //   navigate(ROUTES.signIn);
      // }, 400);
    }
  };

  return (
    <ProfileModal
      open={openModalLogout}
      handleClose={() => setOpenModalLogout(false)}
    >
      <div className='profileLogoutModal'>
        <h2 className='profileLogoutModal__title mb32'>
          Would you like to log out from the immyoutable platform?
        </h2>
        <div className='profileLogoutModal__btns'>
          <Button
            buttonType='outline'
            text='Cancel'
            onClick={() => setOpenModalLogout(false)}
            className='flex1 profileLogoutModal__btn'
          />
          <Button
            text='Log out'
            onClick={logOut}
            className='flex1 profileLogoutModal__btn'
            color='red'
            loading={loading}
          />
        </div>
      </div>
    </ProfileModal>
  );
};
