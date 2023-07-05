import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

//styles
import './styles.scss';
//asssets
import { brokenLinkIcon } from '../../assets/icons';
//components
import { Button } from '../../components';
//context
import { useAuth } from '../../context';
//constants
import { ROUTES } from '../../constants';

export const EmailChange = () => {
  const [activated, setActivated] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();

  const goToLogin = () => {
    navigate(ROUTES.signIn);
  };

  const activateAccount = useCallback(
    async (email: string, code: string) => {
      setLoading(true);
      const res = await auth.emailChangeVerify({
        email: email,
        code: code,
      });
      // console.log('emailVerificationVerify res', res);
      if (res.err) {
        setError(res.data);
        if (res.data === 'expired') {
          setExpired(true);
        }
      } else {
        setActivated(true);
        auth.logOut();
      }

      setLoading(false);
    },
    [auth]
  );

  useEffect(() => {
    const codeParams = searchParams.get('code');
    const emailParams = searchParams.get('email');
    if (
      emailParams &&
      codeParams &&
      !loading &&
      !expired &&
      !error &&
      !activated
    ) {
      activateAccount(emailParams, codeParams);
    }
  }, [searchParams, loading, expired, error, activateAccount, activated]);

  return (
    <div className='auth'>
      {!expired ? (
        <>
          <h2 className='auth__title mb16'>Account new email activation</h2>
          <p className='auth__subtitle'>
            {loading
              ? 'Loading...'
              : error ||
                'Email address has been changed! Please use your new email to sign-in.'}
          </p>
          <div className='auth__container mt32'>
            <Button
              text='OK'
              className='auth__btn'
              color='blue'
              onClick={goToLogin}
            />
          </div>
        </>
      ) : (
        <>
          <img
            className='mb32 auth__brokenLink'
            src={brokenLinkIcon}
            alt='Expired'
          />
          <h2 className='auth__title mb32'>
            Account new email activation
            <br /> link has expired
          </h2>
          <p className='auth__subtitle'>Please request a new activation link</p>
          <Button text='Resend' buttonType='text' className='mt32' />
        </>
      )}
    </div>
  );
};
