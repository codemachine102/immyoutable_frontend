import React, { FC, HTMLAttributes } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { Button, Input } from '..';
//validation
import { changePasswordSchema } from '../../validation';
//constants
import { ROUTES } from '../../constants';

type FormData = {
  old_password?: string;
  password: string;
  confirm_password: string;
};

interface ChangePasswordFromTypes extends HTMLAttributes<HTMLDivElement> {
  submit: (data: any) => void;
  loading?: boolean;
  error?: string;
  isOld?: boolean;
  showForgotButton?: boolean;
}

export const ChangePasswordFrom: FC<ChangePasswordFromTypes> = ({
  submit = () => {},
  loading = false,
  error = '',
  isOld = false,
  showForgotButton = false,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema(isOld)),
  });

  const watch = useWatch({
    control,
  });

  const onSubmit = handleSubmit((data: FormData) => {
    submit(data);
  });

  const goToResetPassword = () => {
    navigate(ROUTES.resetPassword);
  };

  return (
    <div className='form__container'>
      {isOld && (
        <Input
          label='Old password'
          className='form__input mb18'
          register={register('old_password')}
          value={watch.old_password}
          type='password'
          name='old_password'
          error={errors.old_password?.message}
        />
      )}
      <Input
        label='New password'
        className='form__input mb18'
        register={register('password')}
        value={watch.password}
        type='password'
        name='password'
        text='Must be at least 8 characters long including uppercase letters, 
      lowercase letters, numbers and characters'
        error={errors.password?.message}
      />
      <Input
        label='Confirm new password'
        className='form__input mb18'
        register={register('confirm_password')}
        value={watch.confirm_password}
        type='password'
        name='confirm_password'
        error={errors.confirm_password?.message}
      />

      {error && <p className='input__error mb16'>{error}</p>}

      {showForgotButton && (
        <Button
          text='Forgot password'
          buttonType='text'
          className='flex-end mb24'
          onClick={goToResetPassword}
        />
      )}
      <Button
        text='Change password'
        className='form__btn'
        color='blue'
        onClick={onSubmit}
        disabled={!watch.password || !watch.confirm_password}
        loading={loading}
      />
    </div>
  );
};
