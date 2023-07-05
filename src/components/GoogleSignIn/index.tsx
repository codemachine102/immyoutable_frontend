import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import {
  Context,
  CredentialResponse,
  GoogleLogin,
  GsiButtonConfiguration,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from '@react-oauth/google';

//styles
import './styles.scss';
//components
import { Button } from '../Button';
//context
import { useAuth } from '../../context';
import { showToastMessage } from '../../utils';

interface GoogleSignInProps extends HTMLAttributes<HTMLDivElement> {
  text?: GsiButtonConfiguration['text'];
  context?: Context;
}

export const GoogleSignIn: FC<GoogleSignInProps> = ({
  className,
  text = 'signin_with',
  context = 'signin',
}) => {
  const auth = useAuth();

  const loginWithGoogle = async (credentialResponse: CredentialResponse) => {
    const res = await auth.signInGoogle(credentialResponse?.credential);
    if (res.err) {
      showToastMessage({
        type: 'error',
        text: res.data,
      });
    }
  };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
    },
    onError: (errorResponse) => console.log(errorResponse),
    select_account: true,
  });

  useGoogleOneTapLogin({
    onSuccess: loginWithGoogle,
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <>
      {/* <Button
        text='Google'
        className={cn('googleSignIn', className)}
        color='transparent'
        onClick={() => googleLogin()}
      /> */}
      <GoogleLogin
        containerProps={{
          className: cn('googleSignIn', className),
        }}
        onSuccess={loginWithGoogle}
        onError={() => {
          console.log('Login Failed');
        }}
        type='standard'
        theme='filled_black'
        size='large'
        text={text}
        shape='pill'
        logo_alignment='left'
        context={context}
        ux_mode='popup'
        auto_select={true}
        itp_support={true}
        // width='384'
      />
    </>
  );
};
