import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { VerifyOtpForm } from '../../components';
//constants
import { ROUTES } from '../../constants';

export const VerifyOTP = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const submit = (data: any) => {
    navigate(ROUTES.verifyIdentity);
  };

  return (
    <div className='auth'>
      <h2 className='auth__title mb16'>Verify your phone</h2>
      <p className='auth__subtitle mb32'>
        We have sent a verification 6-digit code <br /> to {state?.phoneNumber}
      </p>
      <VerifyOtpForm submit={submit} />
    </div>
  );
};
