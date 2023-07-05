import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  AuthErrorCodes,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBUZpSYk4XbdeoTw9oZ56JgtiVPf6jtwmQ',
  authDomain: 'immyoutable-dev.firebaseapp.com',
  projectId: 'immyoutable-dev',
  storageBucket: 'immyoutable-dev.appspot.com',
  messagingSenderId: '147478029924',
  appId: '1:147478029924:web:680ecfba821c84d3c2a171',
};

export function useFirabaseInstance() {
  const app = initializeApp(firebaseConfig);
  const authFirebase = getAuth(app);
  // authFirebase.settings.appVerificationDisabledForTesting = true;

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      authFirebase
    );
    recaptchaVerifier.render();

    return signInWithError(authFirebase, number, recaptchaVerifier, () =>
      recaptchaVerifier.clear()
    );
  }

  const signInWithError = async (
    authFirebase,
    number,
    recaptchaVerifier,
    errorCalllback
  ) => {
    try {
      const clearNumber = number.replace(/[&\/\\#,()$~%.'":*?<>{}-]/g, '');
      // console.log('signInWithPhoneNumber', { clearNumber, number });
      const response = await signInWithPhoneNumber(
        authFirebase,
        clearNumber,
        recaptchaVerifier
      );
      // console.log('response', response);

      return response;
    } catch (err) {
      console.log('err', err);
      errorCalllback();
      throw err;
    }
  };

  function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
      case AuthErrorCodes.INVALID_PHONE_NUMBER:
        return 'Invalid phone number format';
      case AuthErrorCodes.MISSING_PHONE_NUMBER:
        return 'Please enter a valid phone number';
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        return 'Too many requests, please try again after 5 minutes';
      case AuthErrorCodes.INVALID_CODE:
        return 'Invalid verification code';
      case AuthErrorCodes.CAPTCHA_CHECK_FAILED:
        return 'Captcha check failed';
      // Many more authCode mapping here...

      default:
        return 'An unknown error occured';
    }
  }

  return {
    authFirebase,
    setUpRecaptha,
    signInWithError,
    mapAuthCodeToMessage,
  };
}
