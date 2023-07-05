import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//assets
import {
  profilePlanetBlueImg,
  profilePlanetGreyImg,
  lockImg,
} from '../../assets/img';
import { polygonIcon, snowflakeIcon } from '../../assets/icons';
//components
import { Tooltip } from '../Tooltip';
//constants
import { ROUTES } from '../../constants';

const colors = ['blue', 'orange', 'purple'];

interface UniversityCardProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  img?: string;
  uniName?: string;
  degree?: string;
  year?: string;
  bigImg?: string;
  index?: number;
  disabled?: boolean;
  showIcons?: boolean;
  type?: 'small' | 'big';
  isNavigate?: boolean;
  previewUrl?: string;
  slideId?: string;
}

export const UniversityCard: FC<UniversityCardProps> = ({
  name = '',
  img = '',
  uniName = '',
  degree = '',
  year = '',
  bigImg = '',
  index = 0,
  disabled = false,
  showIcons = true,
  className = '',
  type = 'small',
  isNavigate = true,
  previewUrl = '',
  slideId,
}) => {
  const navigate = useNavigate();

  const goToAsset = () => {
    if (isNavigate) navigate(`${ROUTES.assetPage}/${slideId}`);
  };

  if (!disabled)
    return (
      <div
        className={cn(
          'universityCard',
          `universityCard--${type}`,
          'universityCard--withImage',
          isNavigate && 'universityCard--withImagePointer',
          className
        )}
        onClick={goToAsset}
      >
        <img
          src={previewUrl || bigImg}
          className={'universityCard__fullImage'}
          alt='University card'
        />
      </div>
    );
  return (
    <div
      className={cn(
        'universityCard',
        `universityCard--${colors[index % 3]}`,
        `universityCard--${type}`,
        disabled && 'universityCard--disabled',
        className
      )}
      onClick={goToAsset}
    >
      <h5>{name}</h5>
      <div className='universityCard__img'>
        <img src={img} alt='University' />
      </div>
      <ul className='universityCard__info'>
        <li>{uniName}</li>
        <li>{degree}</li>
        <li>Class of {year}</li>
      </ul>
      <Tooltip
        placement='top'
        tooltipContent='Verified: Education'
        className='universityCard__planetTooltip'
        containerClassName={cn(
          'universityCard__planet',
          disabled && 'universityCard__planet--disabled'
        )}
      >
        <img
          src={disabled ? profilePlanetGreyImg : profilePlanetBlueImg}
          alt='Planet'
        />
      </Tooltip>
      {showIcons ? (
        disabled ? (
          <div className='universityCard__lock'>
            <img src={lockImg} alt='lock' />
          </div>
        ) : (
          <div className='universityCard__icons'>
            <Tooltip
              placement='top-end'
              tooltipContent='Chain: Polygon'
              className='universityCard__iconsTooltip'
            >
              <img
                src={polygonIcon}
                className='universityCard__polygon'
                alt='Polygon'
              />
            </Tooltip>
            <Tooltip
              placement='top-start'
              tooltipContent='Metadata: Frozen'
              className='universityCard__iconsTooltip'
            >
              <img
                src={snowflakeIcon}
                className='universityCard__showflake'
                alt='Snowflake'
              />
            </Tooltip>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};
