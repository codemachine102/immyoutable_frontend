import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//styles
import './styles.scss';
//components
import { Button, GoogleSignIn, Input } from '../../components';
//constants
import { ROUTES } from '../../constants';
//validation
import { signInSchema } from '../../validation';
//utils
import { showToastMessage } from '../../utils';

type FormData = {
  email: string;
  password: string;
};

export const SingleSignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  const watch = useWatch({
    control,
  });

  const submit = handleSubmit((data: FormData) => {
    showToastMessage({
      type: 'base',
      text: 'We’ve sent a verification link to your email',
    });
  });

  const onSubmit = () => {
    submit();
  };

  const goToResetPassword = () => {
    navigate(ROUTES.resetPassword);
  };

  return (
    <div className='auth'>
      <h2 className='auth__title mb16'>Single Sign in</h2>
      <p className='auth__subtitle mb32'>
        Sign in with your EDU email and you'll get connected to resources and
        more
      </p>
      <div className='auth__container'>
        <Input
          label='EDU Email'
          className='auth__input'
          register={register('email')}
          value={watch.email}
          type='email'
          name='email'
          error={errors.email?.message}
          placeholder='name@gmail.com'
        />
        <Input
          label='Password'
          className='auth__input mt18'
          register={register('password')}
          value={watch.password}
          type='password'
          name='password'
          error={errors.password?.message}
        />

        <Button
          text='Forgot password'
          buttonType='text'
          className='flex-end mb24 mt18'
          onClick={goToResetPassword}
        />

        <Button
          text='Sign in'
          className='auth__btn mb16'
          color='blue'
          onClick={onSubmit}
          disabled={!watch.email || !watch.password}
        />
        <GoogleSignIn className='' text='signin_with' context='signin' />
      </div>
    </div>
  );
};
