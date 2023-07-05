import React, { FC, ButtonHTMLAttributes, ReactNode, useMemo } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';

interface ButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string | ReactNode;
  disabled?: boolean;
  color?: 'orange' | 'blue' | 'transparent' | 'red' | 'blueGradient';
  outline?: boolean;
  beforeIcon?: string;
  afterIcon?: string;
  buttonType?: 'text' | 'textSecondary' | 'outline' | 'full';
  loading?: boolean;
  href?: string;
}

export const Button: FC<ButtonTypes> = ({
  text = '',
  className = '',
  disabled = false,
  color = 'blue',
  type,
  onClick = () => {},
  beforeIcon,
  afterIcon,
  buttonType = 'full',
  loading = false,
  href,
}) => {
  const textOnLoading = useMemo(
    () => (loading ? 'Loading...' : text),
    [text, loading]
  );

  const buttonClassName = cn(
    'button',
    `button--${buttonType}`,
    color && `button--${buttonType}--${color} button--${color}`,
    disabled && `button--${buttonType}--disabled button--disabled`,
    className
  );

  const ButtonContent = () => (
    <>
      {color === 'orange' && buttonType === 'full' && (
        <div className={cn('button__bg', `button__bg--${color}`)} />
      )}
      {beforeIcon && (
        <img
          src={beforeIcon}
          className={cn('button__icon', 'button__icon--before')}
          alt='before'
        />
      )}
      {typeof text === 'string' ? <span>{textOnLoading}</span> : textOnLoading}
      {afterIcon && (
        <img
          src={afterIcon}
          className={cn('button__icon', 'button__icon--after')}
          alt='after'
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        className={buttonClassName}
        type={type}
        href={href}
        target='_blank'
        rel='noreferrer'
      >
        <ButtonContent />
      </a>
    );
  }
  return (
    <button
      className={buttonClassName}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <ButtonContent />
    </button>
  );
};
