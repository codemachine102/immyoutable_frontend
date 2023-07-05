import React, { useState } from 'react';
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
//context
import { useAuth } from '../../context';

type FormData = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
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

  const auth = useAuth();

  const submit = handleSubmit(async (data: FormData) => {
    setLoading(true);
    const res = await auth.signIn(data);
    setLoading(false);

    if (res.err) {
      showToastMessage({
        type: 'error',
        text: res.data,
      });
    }
  });

  const onSubmit = () => {
    submit();
  };

  const goToResetPassword = () => {
    navigate(ROUTES.resetPassword);
  };

  const goToSignUp = () => {
    navigate(ROUTES.signUp);
  };

  return (
    <div className='auth'>
      <h2 className='auth__title mb16'>Log in</h2>
      <p className='auth__subtitle mb32'>
        Welcome back! Please enter your details
      </p>
      <div className='auth__container'>
        <Input
          label='Email'
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
          loading={loading}
        />
        <GoogleSignIn className='' text='signin_with' context='signin' />
        <div className='auth__text mt24'>
          <span>Don’t have an account?</span>
          <Button
            text='Sign up'
            buttonType='text'
            className='align-baseline'
            onClick={goToSignUp}
          />
        </div>
      </div>
    </div>
  );
};
