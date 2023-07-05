import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { SwiperOptions } from 'swiper';
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
//context
import { useDesign } from '../../../context';

interface ProfileEducationProps extends HTMLAttributes<HTMLDivElement> {
  slidesPerView?: number | 'auto';
  showBtn?: boolean;
  showPaginaton?: boolean;
  sliderClassName?: string;
  centeredSlides?: boolean;
  showIconsSlider?: boolean;
  breakpoints?: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };
  spaceBetween?: number;
}

export const ProfileEducation: FC<ProfileEducationProps> = ({
  slidesPerView,
  className = '',
  showBtn = false,
  showPaginaton = true,
  sliderClassName,
  centeredSlides,
  showIconsSlider,
  breakpoints,
  spaceBetween,
}) => {
  const design = useDesign();
  const navigate = useNavigate();

  const navigateToDesignStudion = () => {
    navigate(ROUTES.design);
  };

  return (
    <div className={cn('profileEducation', className)}>
      <div className='profile__subtitle'>
        <h3>Education</h3>
        {showBtn && (
          <Button
            text={<img src={plusIcon} alt='Plus' />}
            className='profile__subtitlePlus ml16'
            onClick={navigateToDesignStudion}
          />
        )}
      </div>
      {design.mintedCards && !!design.mintedCards.length && (
        <Slider
          items={design.mintedCards}
          slidesPerView={slidesPerView}
          showPaginaton={showPaginaton}
          className={sliderClassName}
          centeredSlides={centeredSlides}
          showIcons={showIconsSlider}
          breakpoints={breakpoints}
          spaceBetween={spaceBetween}
        />
      )}
    </div>
  );
};
