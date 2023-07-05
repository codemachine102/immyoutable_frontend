import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { Slider } from '../../Slider';
import { Button } from '../../Button';
//assets
import { plusIcon } from '../../../assets/icons';
//constants
import { ROUTES, universitiesSlider } from '../../../constants';

interface ProfileWorkProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  disabledSlider?: boolean;
  showBtn?: boolean;
  slidesPerView?: number;
  showPaginaton?: boolean;
  sliderClassName?: string;
  centeredSlides?: boolean;
  showIconsSlider?: boolean;
}

export const ProfileWork: FC<ProfileWorkProps> = ({
  disabled = false,
  disabledSlider = false,
  className,
  showBtn = false,
  slidesPerView = 2,
  showPaginaton = true,
  sliderClassName,
  centeredSlides,
  showIconsSlider,
}) => {
  const navigate = useNavigate();

  const navigateToDesignStudion = () => {
    navigate(ROUTES.design);
  };

  return (
    <div className={cn('profileWork', className)}>
      <div
        className={cn(
          'profile__subtitle',
          disabled && 'profile__subtitle--disabled'
        )}
      >
        <h3>Work (Beta)</h3>
        {showBtn && (
          <Button
            text={<img src={plusIcon} alt='Plus' />}
            className='profile__subtitlePlus ml16'
            disabled={disabled}
            onClick={navigateToDesignStudion}
          />
        )}
      </div>
      <Slider
        items={universitiesSlider}
        slidesPerView={slidesPerView}
        disabled={disabled}
        disabledSlider={disabledSlider}
        showPaginaton={showPaginaton}
        className={sliderClassName}
        centeredSlides={centeredSlides}
        showIcons={showIconsSlider}
      />
    </div>
  );
};
