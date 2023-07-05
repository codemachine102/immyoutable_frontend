import React, { useState, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//assets
import { arrowDropdownIcon } from '../../assets/icons';

interface SelectTypes extends HTMLAttributes<HTMLDivElement> {
  options: string[];
  selected?: string | undefined;
  setSelected?: (type: string) => void;
  label: string;
}

export const InputSelect: FC<SelectTypes> = (props) => {
  const {
    className = '',
    options = [],
    selected = '',
    setSelected = () => {},
    label = '',
  } = props;

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  return (
    <div className={cn('inputSelect__container', className)}>
      {label && <div className='inputSelect__label'>{label}</div>}
      <div
        className='inputSelect__input'
        onClick={() => {
          setIsSelectOpen((value) => !value);
        }}
      >
        {selected}
        <img
          src={arrowDropdownIcon}
          className={cn(
            'inputSelect__arrow',
            isSelectOpen && 'inputSelect__arrow--open'
          )}
          alt='Arrow Dropdown'
        />
      </div>
      <div
        className='inputSelect__options'
        style={{ display: isSelectOpen ? 'flex' : 'none' }}
      >
        {options.map((option) => (
          <div
            key={`inputSelect__option-${option}`}
            onClick={() => {
              // console.log(option);

              setSelected(option);
              setIsSelectOpen(false);
            }}
            className='inputSelect__option'
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
