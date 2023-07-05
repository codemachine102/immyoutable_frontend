import React, { useState, FC, useMemo, HTMLAttributes, useRef } from 'react';
import cn from 'classnames';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';

//styles
import './styles.scss';
//assets
import { arrowDownIcon } from '../../assets/icons';
//hooks
import { useOnClickOutside } from '../../hooks';

interface SelectTypes extends HTMLAttributes<HTMLDivElement> {
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
}

interface CountryData {
  label: string;
  value: string;
}

export const CountrySelect: FC<SelectTypes> = (props) => {
  const {
    className = '',
    selectedCountry = {
      value: 'US',
      label: 'United States',
    },
    setSelectedCountry,
  } = props;
  const options: CountryData[] = useMemo(() => countryList().getData(), []);

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsSelectOpen(false));
  return (
    <div className={cn('countrySelect__container', className)} ref={ref}>
      <div
        className='countrySelect__input'
        onClick={() => {
          setIsSelectOpen((value) => !value);
        }}
      >
        <ReactCountryFlag
          countryCode={selectedCountry.value}
          style={{
            fontSize: '27px',
            lineHeight: '20px',
            // paddingTop: '5px',
          }}
          svg
        />
        <img src={arrowDownIcon} className='countrySelect__arrow' alt='Arrow' />
      </div>
      <div
        className='countrySelect__options'
        style={{ display: isSelectOpen ? 'flex' : 'none' }}
      >
        {options.map((country) => (
          <div
            key={country.value}
            onClick={() => {
              // console.log(country);

              setSelectedCountry(country);
              setIsSelectOpen(false);
            }}
            className='countrySelect__option'
          >
            <ReactCountryFlag
              countryCode={country.value}
              style={{
                fontSize: '22px',
                lineHeight: '18px',
                paddingTop: '5px',
                marginRight: '5px',
              }}
              svg
            />{' '}
            {country.label}
          </div>
        ))}
      </div>
    </div>
  );
};
