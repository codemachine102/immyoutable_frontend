import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//styles
import './styles.scss';
//components
import { Button, Input } from '../../components';
//constants
import { ROUTES } from '../../constants';
//validation
import { resetPasswordSchema } from '../../validation';
//utils
import { showToastMessage } from '../../utils';
//context
import { useAuth } from '../../context';

type FormData = {
  email: string;
};

export const ResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [linkSend, setLinkSend] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const watch = useWatch({
    control,
  });

  const submit = handleSubmit(async (data: FormData) => {
    setLoading(true);
    const res = await auth.accessRecoveryRequest(data?.email);
    setLoading(false);

    if (!res.err) {
      setLinkSend(true);
      // navigate(ROUTES.changePassword);
    } else {
      showToastMessage({
        type: 'error',
        text: res.data,
      });
    }
  });

  const onSubmit = () => {
    submit();
  };

  const goToLogin = () => {
    navigate(ROUTES.signIn);
  };

  return (
    <div className='auth'>
      {!linkSend ? (
        <>
          <h2 className='auth__title mb16'>Reset password</h2>
          <p className='auth__subtitle mb32'>
            Enter your email and we will send you an email with the instructions
            to reset your password
          </p>
          <div className='auth__container'>
            <Input
              label='Email'
              className='auth__input mb32'
              register={register('email')}
              value={watch.email}
              type='email'
              name='email'
              error={errors.email?.message}
              placeholder='name@gmail.com'
            />

            <Button
              text='Reset password'
              className='auth__btn'
              color='blue'
              onClick={onSubmit}
              disabled={!watch.email}
              loading={loading}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className='auth__title mb16'>Reset password</h2>
          <p className='auth__subtitle mb32'>
            Verification email has been sent
          </p>
          <div className='auth__container'>
            <Button
              text='OK'
              className='auth__btn'
              color='blue'
              onClick={goToLogin}
            />
          </div>
        </>
      )}
    </div>
  );
};
