import React, { useState, FC, InputHTMLAttributes, ReactElement } from 'react';
import cn from 'classnames';
import InputMask from 'react-input-mask';

//styles
import './styles.scss';
//assets
import { errorIcon, eyeIcon, eyeOffIcon } from '../../assets/icons';

interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  // value: string;
  // handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  name: string;
  text?: string;
  error?: string;
  rightElement?: ReactElement;
  leftElement?: ReactElement;
  inputClassName?: string;
  mask?: string;
  cols?: number;
  rows?: number;
}

export const Input: FC<InputTypes> = (props) => {
  const {
    type = 'text',
    style = {},
    className = '',
    label = '',
    name = '',
    register,
    value,
    text,
    error,
    placeholder = '',
    disabled = false,
    rightElement,
    leftElement,
    onChange,
    inputClassName,
    mask,
    onClick,
    readOnly,
    cols,
    rows = 3,
  } = props;

  const [showPassword, setShownType] = useState<boolean>(true);

  const handleEyePress = () => {
    setShownType((prev) => !prev);
  };

  const reg = register
    ? { ...register }
    : {
        value: value,
        onChange: onChange,
      };

  const inputMask = () => (
    <InputMask
      mask={mask}
      className={cn(
        'input',
        leftElement && 'input--leftPadding',
        error && 'input--error',
        disabled && 'input--disabled',
        (rightElement || type === 'password') && 'input--rightPadding',
        inputClassName
      )}
      type={showPassword ? type : 'text'}
      style={style}
      placeholder={placeholder}
      readOnly={disabled || readOnly}
      maskChar={null}
      {...reg}
    />
  );

  const inputRefular = () => (
    <input
      className={cn(
        'input',
        leftElement && 'input--leftPadding',
        error && 'input--error',
        disabled && 'input--disabled',
        (rightElement || type === 'password') && 'input--rightPadding',
        inputClassName
      )}
      type={showPassword ? type : 'text'}
      style={style}
      placeholder={placeholder}
      readOnly={disabled || readOnly}
      {...reg}
    />
  );

  const inputTextarea = () => (
    <textarea
      className={cn(
        'input',
        leftElement && 'input--leftPadding',
        error && 'input--error',
        disabled && 'input--disabled',
        (rightElement || type === 'password') && 'input--rightPadding',
        inputClassName
      )}
      type={showPassword ? type : 'text'}
      style={style}
      placeholder={placeholder}
      readOnly={disabled || readOnly}
      cols={cols}
      rows={rows}
      {...reg}
    />
  );

  return (
    <div className={cn('input__container', className)} onClick={onClick}>
      <div className='input__relative'>
        {mask
          ? inputMask()
          : type === 'textarea'
          ? inputTextarea()
          : inputRefular()}
        <label
          className={cn(
            'input__label',
            leftElement && 'input__label--leftPadding',
            value && 'input__label--filled',
            error && 'input__label--error'
          )}
          htmlFor={name}
        >
          {label}
        </label>
        {type === 'password' && (
          <div className='input__eye' onClick={handleEyePress}>
            <img
              src={!error ? (showPassword ? eyeOffIcon : eyeIcon) : errorIcon}
              alt='eye'
            />
          </div>
        )}
        {leftElement && <div className='input__leftElement'>{leftElement}</div>}
        {rightElement && (
          <div className='input__rightElement'>{rightElement}</div>
        )}
        {error && <p className='input__error mt8'>{error}</p>}
        {text && <p className='input__text mt8'>{text}</p>}
      </div>
    </div>
  );
};
