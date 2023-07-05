import React, { FC, HTMLAttributes } from 'react';
import OtpInput from 'react18-input-otp';
import cn from 'classnames';

//styles
import './styles.scss';

interface OTPTypes extends HTMLAttributes<HTMLDivElement> {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  errorMessage?: string;
}

export const OTPInput: FC<OTPTypes> = (props) => {
  const {
    className = '',
    code = '',
    setCode = () => {},
    error = '',
    setError = () => {},
  } = props;

  return (
    <>
      <OtpInput
        value={code}
        onChange={(e: any) => {
          setCode(e);
          setError('');
        }}
        numInputs={6}
        isInputNum={true}
        className={cn('otp', className, { 'otp--error': error })}
        containerStyle={'otp__container'}
        focusStyle={'otp--focused'}
        placeholder='      '
      />
      {error && <p className='otp__error mt16'>{error}</p>}
    </>
  );
};
