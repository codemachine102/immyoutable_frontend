import React from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { Button } from '../../components';
//constants
import { ROUTES } from '../../constants';

export const PasswordUpdated = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate(ROUTES.signIn);
  };
  return (
    <div className='auth'>
      <h2 className='auth__title mb16'>Password updated!</h2>
      <p className='auth__subtitle mb32'>
        You have successfully updated <br />
        your password and can now sign in
      </p>
      <div className='auth__container'>
        <Button
          text='Sign in'
          className='auth__btn mb16'
          color='blue'
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
