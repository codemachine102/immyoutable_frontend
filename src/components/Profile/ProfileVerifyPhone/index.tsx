import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

//styles
import './styles.scss';
//components
import { ProfileModal } from '../ProfileModal';
import { VerifyOtpForm, VerifyPhoneForm } from '../../Form';
import { ProfileVerifyButton } from '../ProfileVerifyButton';
//context
import { useAuth } from '../../../context';
//firebase
import { useFirabaseInstance } from '../../../firebase';

interface ProfileVerifyPhoneProps extends HTMLAttributes<HTMLDivElement> {
  isAproved?: boolean;
}

export const ProfileVerifyPhone: FC<ProfileVerifyPhoneProps> = ({
  isAproved = false,
}) => {
  const auth = useAuth();
  const firebaseInstance = useFirabaseInstance();

  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [openModalPhone, setOpenModalPhone] = useState<boolean>(false);

  const [phoneLoading, setPhoneLoading] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');

  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>('');

  const [result, setResult] = useState<any>(null);

  const submitVerifyPhone = useCallback(
    async (token: string) => {
      setOtpLoading(true);
      const res = await auth.verifyPhone(token);
      // console.log('submitVerifyPhone res', res);

      if (res.err) {
        setOtpError(res.data);
      } else {
        setOpenModalPhone(false);
        auth.getUserFn();
      }

      setOtpLoading(false);
    },
    [auth]
  );

  const getOtp = async (number: string) => {
    setPhoneLoading(true);
    try {
      setPhoneError('');
      const response = await firebaseInstance.setUpRecaptha(number);
      // console.log('getOtp response', response);
      setResult(response);
      setPhoneNumber(number);
    } catch (err: any) {
      console.log(
        'getOtp error',
        firebaseInstance.mapAuthCodeToMessage(err?.code)
      );
      const errorTxt = firebaseInstance.mapAuthCodeToMessage(err?.code);
      setPhoneError(errorTxt);
    }
    setPhoneLoading(false);
  };

  const verifyOtp = async (code: string) => {
    setOtpLoading(true);
    try {
      const response = await result.confirm(code);
      // console.log('verifyOtp response', response);
      await submitVerifyPhone(response.user.accessToken);
    } catch (err: any) {
      console.log('verifyOtp error', err);
      const errorTxt = firebaseInstance.mapAuthCodeToMessage(err?.code);
      setOtpError(errorTxt);
    }
    setOtpLoading(false);
  };

  useEffect(() => {
    setPhoneNumber('');
    setOtpLoading(false);
    setOtpError('');
    setPhoneLoading(false);
    setPhoneError('');
  }, [openModalPhone]);

  return (
    <div className='profileVerifyPhone'>
      <ProfileVerifyButton
        text='Phone'
        onClick={() => setOpenModalPhone(true)}
        isAproved={isAproved}
      />
      <ProfileModal
        open={openModalPhone}
        handleClose={() => setOpenModalPhone(false)}
      >
        {!phoneNumber ? (
          <>
            <h2 className='auth__title mb16'>Verify your phone</h2>
            <p className='auth__subtitle mb32'>
              Please enter your phone number. We will send an SMS message to
              verify your phone number
            </p>
            <VerifyPhoneForm
              submit={(data) => getOtp(data)}
              loading={phoneLoading}
              error={phoneError}
              setError={setPhoneError}
            />
          </>
        ) : (
          <>
            <h2 className='auth__title mb16'>Verify your phone</h2>
            <p className='auth__subtitle mb32'>
              We have sent a verification 6-digit code <br /> to {phoneNumber}
            </p>
            <VerifyOtpForm
              submit={(code) => verifyOtp(code)}
              loading={otpLoading}
              error={otpError}
              setError={setOtpError}
            />
          </>
        )}
      </ProfileModal>
    </div>
  );
};
