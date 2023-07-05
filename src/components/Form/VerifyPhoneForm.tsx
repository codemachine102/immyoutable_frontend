import React, {
  useState,
  useEffect,
  FC,
  HTMLAttributes,
  useCallback,
} from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//styles
import './styles.scss';
//components
import { Button, PhoneInput } from '..';
//constants
import { countryMasks } from '../../constants';
//validation
import { verifyPhoneSchema } from '../../validation';

type FormData = {
  phone: string;
};

interface VerifyPhoneFormTypes extends HTMLAttributes<HTMLDivElement> {
  submit: (data: any) => void;
  loading?: boolean;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}

export const VerifyPhoneForm: FC<VerifyPhoneFormTypes> = ({
  submit = () => {},
  loading = false,
  error = '',
  setError = () => {},
}) => {
  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  }>({
    value: 'US',
    label: 'United States',
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    formState: { isDirty },
    reset,
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(
      verifyPhoneSchema(
        countryMasks[selectedCountry.value as keyof typeof countryMasks]
      )
    ),
    defaultValues: {
      phone: ' ',
    },
  });

  const watch = useWatch({
    control,
  });

  const onSubmit = handleSubmit((data: FormData) => {
    submit(data.phone);
  });

  const setPhoneValue = useCallback(
    (value: string) => {
      setValue('phone', value, { shouldDirty: true });
      if (errors?.phone) {
        trigger();
      }
    },
    [errors]
  );

  useEffect(() => {
    reset({});
    setValue('phone', ' ', { shouldDirty: false });
  }, [selectedCountry]);

  return (
    <div className='form__container'>
      <PhoneInput
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        label=''
        name='phone'
        value={watch.phone}
        setValue={setPhoneValue}
        error={errors.phone?.message}
      />
      <div id='recaptcha-container' className='form__recaptcha' />
      {error && <p className='phoneInput__error mb8'>{error}</p>}
      <Button
        text='Verify'
        className='form__btn'
        color='blue'
        onClick={onSubmit}
        disabled={!watch.phone || !isDirty}
        loading={loading}
      />
    </div>
  );
};
