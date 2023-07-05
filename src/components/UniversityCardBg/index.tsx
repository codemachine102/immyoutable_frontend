import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//assets
import { polygonIcon, snowflakeIcon } from '../../assets/icons';
//components
import { Tooltip } from '../Tooltip';

const colors = ['blue', 'orange', 'purple'];

interface UniversityCardBgProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  img?: string;
  uniName?: string;
  degree?: string;
  year?: string;
  index?: number;
  disabled?: boolean;
  showIcons?: boolean;
  type?: 'small' | 'big';
}

export const UniversityCardBg: FC<UniversityCardBgProps> = ({
  name = '',
  img = '',
  uniName = '',
  degree = '',
  year = '',
  index = 0,
  disabled = false,
  showIcons = true,
  className = '',
  type = 'small',
}) => {
  return (
    <div
      className={cn(
        'universityCardBg',
        `universityCardBg--${colors[index % 3]}`,
        `universityCardBg--${type}`,
        disabled && 'universityCardBg--disabled',
        className
      )}
    >
      {showIcons ? (
        <div className='universityCardBg__icons'>
          <Tooltip
            placement='top-end'
            tooltipContent='Chain: Polygon'
            className='universityCardBg__iconsTooltip'
          >
            <img
              src={polygonIcon}
              className='universityCardBg__polygon'
              alt='Polygon'
            />
          </Tooltip>
          <Tooltip
            placement='top-start'
            tooltipContent='Metadata: Frozen'
            className='universityCardBg__iconsTooltip'
          >
            <img
              src={snowflakeIcon}
              className='universityCardBg__showflake'
              alt='Snowflake'
            />
          </Tooltip>
        </div>
      ) : (
        <></>
      )}
      <h5>{name}</h5>
      <div className='universityCardBg__img'>
        <img src={img} alt='University' />
      </div>
      <ul className='universityCardBg__info'>
        <li>{uniName}</li>
        <li>{degree}</li>
        <li>Class of {year}</li>
      </ul>
    </div>
  );
};
