import React, { FC, HTMLAttributes } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { Button, Input } from '..';
//validation
import { changeEmailSchema } from '../../validation';

type FormData = {
  email: string;
};

interface ChangeEmailFromTypes extends HTMLAttributes<HTMLDivElement> {
  submit: (data: any) => void;
  loading?: boolean;
  error?: string;
}

export const ChangeEmailForm: FC<ChangeEmailFromTypes> = ({
  submit = () => {},
  loading = false,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(changeEmailSchema),
  });

  const watch = useWatch({
    control,
  });

  const onSubmit = handleSubmit((data: FormData) => {
    submit(data);
  });

  return (
    <div className='auth__container'>
      <Input
        label='Email'
        className={cn('form__input', error ? 'mb8' : 'mb32')}
        register={register('email')}
        value={watch.email}
        type='email'
        name='email'
        error={errors.email?.message}
        placeholder='name@gmail.com'
      />
      {error && <p className='input__error align-center mb16'>{error}</p>}

      <Button
        text='Change'
        className='form__btn'
        color='blue'
        onClick={onSubmit}
        disabled={!watch.email}
        loading={loading}
      />
    </div>
  );
};
