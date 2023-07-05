import React, { FC, HTMLAttributes } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//styles
import './styles.scss';
//components
import { Button, Input, InputSelect } from '..';
//validation
import { verifyIdentitySchema } from '../../validation';

type FormData = {
  type: string;
  number: string;
};

interface VerifyIdentityFormTypes extends HTMLAttributes<HTMLDivElement> {
  submit: (data: any) => void;
}

export const VerifyIdentityForm: FC<VerifyIdentityFormTypes> = ({
  submit = () => {},
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(verifyIdentitySchema),
    defaultValues: {
      type: 'Passport',
    },
  });

  const watch = useWatch({
    control,
  });

  const onSubmit = handleSubmit((data: FormData) => {
    // console.log(data);
    submit(data);
  });

  const setType = (type: string) => {
    setValue('type', type);
  };

  return (
    <div className='form__container'>
      <InputSelect
        label='Document type'
        className='form__input'
        options={['Passport', 'ID Card']}
        selected={watch.type}
        setSelected={setType}
      />
      <Input
        label={`${watch.type} number`}
        className='form__input mt24'
        register={register('number')}
        value={watch.number}
        type='text'
        name='number'
        error={errors.number?.message}
      />
      <Button
        text='Verify'
        className='form__btn mt24'
        color='blue'
        onClick={onSubmit}
        disabled={!watch.type || !watch.number}
      />
    </div>
  );
};
