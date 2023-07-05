import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';

interface CheckboxProps extends HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  onChange = () => {},
  className,
}) => {
  return (
    <div className={cn('checkbox__container', className)}>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='checkbox'
      />
    </div>
  );
};
