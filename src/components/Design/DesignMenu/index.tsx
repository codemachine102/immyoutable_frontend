import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//types
import { DesignMenuItemType } from '../types';

interface DesignMenuProps extends HTMLAttributes<HTMLDivElement> {
  options: DesignMenuItemType[];
  activeOption: DesignMenuItemType;
  setActiveOption: React.Dispatch<React.SetStateAction<DesignMenuItemType>>;
}

const DesignMenuImage = ({
  isActive,
  icon,
  activeIcon,
}: {
  isActive: boolean;
  icon: string;
  activeIcon: string;
}) => {
  return (
    <div
      className={cn(
        'designMenu__optionIcon',
        isActive && 'designMenu__optionIcon--active'
      )}
    >
      <img src={isActive ? activeIcon : icon} alt='menu' />
    </div>
  );
};

export const DesignMenu: FC<DesignMenuProps> = ({
  className,
  options,
  activeOption,
  setActiveOption,
}) => {
  return (
    <div className={cn('designMenu', className)}>
      {options.map((option) => {
        const isActive = activeOption.title === option.title;
        return (
          <div
            className={cn(
              'designMenu__option',
              isActive && 'designMenu__option--active'
            )}
            key={`designMenu__option--${option.title}`}
            onClick={() => setActiveOption(option)}
          >
            <DesignMenuImage
              isActive={isActive}
              icon={option.icon}
              activeIcon={option.activeIcon}
            />
            <span>{option.title}</span>
          </div>
        );
      })}
    </div>
  );
};
