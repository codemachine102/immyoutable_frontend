import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { Button } from '../../Button';
import { ProfileModal } from '../ProfileModal';
import { ChangePasswordFrom } from '../../Form';
//context
import { useAuth } from '../../../context';

interface ProfilePasswordProps extends HTMLAttributes<HTMLDivElement> {}

export const ProfilePassword: FC<ProfilePasswordProps> = ({ className }) => {
  const [openModalPassword, setOpenModalPassword] = useState<boolean>(false);
  const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const auth = useAuth();

  useEffect(() => {
    setPasswordUpdated(false);
  }, [openModalPassword]);

  const submitChangePassword = useCallback(
    async (data: {
      old_password: string;
      password: string;
      confirm_password: string;
    }) => {
      setPasswordLoading(true);
      const res = await auth.changePassword({
        oldPassword: data.old_password,
        newPassword: data.password,
        newPasswordConfirm: data.confirm_password,
      });
      // console.log('changePassword res', res);

      if (res.err) {
        setPasswordError(res.data);
      } else {
        setPasswordUpdated(true);
      }

      setPasswordLoading(false);
    },
    [auth]
  );

  useEffect(() => {
    setPasswordUpdated(false);
    setPasswordLoading(false);
    setPasswordError('');
  }, [openModalPassword]);

  return (
    <div className={cn('profilePassword', className)}>
      <div className='profile__subtitle profilePassword__title'>
        <h3>password</h3>
        <Button
          text='Change'
          buttonType='text'
          onClick={() => setOpenModalPassword(true)}
        />
      </div>
      <div className='profilePassword__text'>● ● ● ● ● ● ● ● ● ●</div>

      <ProfileModal
        open={openModalPassword}
        handleClose={() => setOpenModalPassword(false)}
      >
        {!passwordUpdated ? (
          <>
            <h2 className='auth__title mb16'>Change password</h2>
            <p className='auth__subtitle mb32'>Please create a new password</p>
            <ChangePasswordFrom
              submit={(data) => submitChangePassword(data)}
              loading={passwordLoading}
              error={passwordError}
              isOld
            />
          </>
        ) : (
          <>
            <h2 className='auth__title mb16'>Password updated!</h2>
            <p className='auth__subtitle mb32'>
              You have successfully updated your password{' '}
            </p>
            <div className='form__container'>
              <Button text='Ok' onClick={() => setOpenModalPassword(false)} />
            </div>
          </>
        )}
      </ProfileModal>
    </div>
  );
};
