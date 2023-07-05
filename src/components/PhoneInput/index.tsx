import React, { FC, InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { CountrySelect } from '../CountrySelect';
//constants
import { countryMasks } from '../../constants';

interface PhoneInputTypes extends InputHTMLAttributes<HTMLInputElement> {
  selectedCountry: {
    value: string;
    label: string;
  };
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<{
      value: string;
      label: string;
    }>
  >;
  label: string;
  name: string;
  text?: string;
  error?: string;
  setValue: (value: string) => void;
}

export const PhoneInput: FC<PhoneInputTypes> = (props) => {
  const {
    value,
    error,
    selectedCountry = {
      value: 'US',
      label: 'United States',
    },
    setSelectedCountry,
    setValue,
  } = props;

  const mask: string =
    countryMasks[selectedCountry.value as keyof typeof countryMasks];

  return (
    <div className='mb24'>
      <div className='phoneInput__container'>
        <CountrySelect
          className='phoneInput__select'
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <InputMask
          mask={mask}
          maskChar={null}
          onChange={(e: any) => setValue(e?.target?.value)}
          value={value}
          className={cn('phoneInput', error && 'phoneInput--error')}
        />
      </div>
      {error && <p className='phoneInput__error mt8'>{error}</p>}
    </div>
  );
};
