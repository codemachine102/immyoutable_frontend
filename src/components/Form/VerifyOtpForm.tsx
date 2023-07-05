import React, { useState, FC, HTMLAttributes } from 'react';

//styles
import './styles.scss';
//components
import { Button, OTPInput } from '..';

interface VerifyOtpFormTypes extends HTMLAttributes<HTMLDivElement> {
  submit: (data: any) => void;
  loading?: boolean;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}

export const VerifyOtpForm: FC<VerifyOtpFormTypes> = ({
  submit = () => {},
  loading = false,
  error = '',
  setError = () => {},
}) => {
  const [code, setCode] = useState<string>('');

  const onSubmit = () => {
    submit(code);
  };

  return (
    <div className='form__container'>
      <OTPInput
        code={code}
        setCode={setCode}
        error={error}
        setError={setError}
      />
      <Button
        text='Verify'
        className='form__btn mb32 mt32'
        color='blue'
        onClick={onSubmit}
        disabled={code.length !== 6}
        loading={loading}
      />
      <div className='form__resend'>
        <p>Didn't get the code?</p>
        <div onClick={() => console.log('Resend')}>Resend</div>
      </div>
    </div>
  );
};
