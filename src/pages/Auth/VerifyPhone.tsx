import React from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { VerifyPhoneForm } from '../../components';
//constants
import { ROUTES } from '../../constants';

export const VerifyPhone = () => {
  const navigate = useNavigate();

  const submit = (data: any) => {
    navigate(ROUTES.verifyCode, { state: { phoneNumber: data } });
  };

  return (
    <div className='auth'>
      <h2 className='auth__title mb16'>Verify your phone</h2>
      <p className='auth__subtitle mb32'>
        Please enter your phone number. We will send an SMS message to verify
        your phone number
      </p>
      <VerifyPhoneForm submit={submit} />
    </div>
  );
};
