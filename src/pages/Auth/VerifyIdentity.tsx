import React from 'react';

//styles
import './styles.scss';
//components
import { Button, VerifyIdentityForm } from '../../components';

export const VerifyIdentity = () => {
  const submit = (data: any) => {
    // console.log(data);
  };

  return (
    <div className='auth'>
      <h2 className='auth__title mb32'>Verify identity</h2>
      <VerifyIdentityForm submit={submit} />
      <Button text='Skip' buttonType='textSecondary' className='mt24' />
    </div>
  );
};
