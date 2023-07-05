import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { ChangePasswordFrom, GoogleSignIn } from '../../components';
//constants
import { ROUTES } from '../../constants';
//context
import { useAuth } from '../../context';
//utils
import { showToastMessage } from '../../utils';

const CHANGE_PASS_TYPES = {
  firstLogin: 'initial',
  accessRecovery: 'recovery',
};

export const ChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auth = useAuth();

  const submit = useCallback(
    async (data: { password: string; confirm_password: string }) => {
      // console.log(data);

      setLoading(true);
      const res = await auth.accessRecoveryVerify({
        email: searchParams.get('email'),
        code: searchParams.get('code'),
        password: data.password,
        passwordConfirm: data.confirm_password,
      });
      // console.log('emailVerificationVerify res', res);

      if (res.err) {
        showToastMessage({
          type: 'error',
          text: res.data,
        });
      } else {
        navigate(ROUTES.passwordUpdated);
      }

      setLoading(false);
    },
    [searchParams, auth, navigate]
  );

  const isFirstLogin = useMemo(
    () => searchParams.get('type') === CHANGE_PASS_TYPES.firstLogin,
    [searchParams]
  );

  return (
    <div className='auth'>
      <h2 className='auth__title mb16'>Change password</h2>
      <p className='auth__subtitle mb32'>Please create a new password</p>
      <div className='auth__container'>
        <ChangePasswordFrom
          submit={submit}
          loading={loading}
          showForgotButton={!isFirstLogin}
        />
        {!isFirstLogin && (
          <GoogleSignIn className='mt16' text='signin_with' context='signin' />
        )}
      </div>
    </div>
  );
};
