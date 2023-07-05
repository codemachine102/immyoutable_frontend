import React, { useState, FC, HTMLAttributes } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Swiper as SwiperType,
  SwiperOptions,
} from 'swiper';
import cn from 'classnames';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/swiper.min.css';
// import 'swiper/modules/navigation/navigation.min.css';

//styles
import './styles.scss';
//components
import { UniversityCard } from '../UniversityCard';

interface SliderProps extends HTMLAttributes<HTMLDivElement> {
  items: any[];
  slidesPerView?: number | 'auto';
  disabled?: boolean;
  disabledSlider?: boolean;
  showPaginaton?: boolean;
  centeredSlides?: boolean;
  showIcons?: boolean;
  breakpoints?: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };
  spaceBetween?: number;
}

export const Slider: FC<SliderProps> = ({
  items,
  slidesPerView = 3,
  disabled = false,
  disabledSlider = false,
  showPaginaton = true,
  className = '',
  centeredSlides = false,
  showIcons,
  breakpoints,
  spaceBetween = 32,
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '" ></span>';
    },
  };

  if (disabledSlider && typeof slidesPerView == 'number') {
    return (
      <div className={cn('slider--disabled', className)}>
        {items?.slice(0, slidesPerView)?.map((slide, index) => (
          <div className='slider__item'>
            <UniversityCard
              {...slide}
              disabled={disabled}
              showIcons={showIcons}
              key={`slider-item-${index}-${slide?.uniName}-${slide?.year}`}
              slideId={slide.id}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('slider', className)}>
      <div
        className={cn(
          'swiper-button-prev',
          `swiper-button-prev-${className}`,
          showPaginaton && 'swiper-button-prev-pagination'
        )}
      ></div>
      <div
        className={cn(
          'swiper-button-next',
          `swiper-button-next-${className}`,
          showPaginaton && 'swiper-button-next-pagination'
        )}
      ></div>
      <Swiper
        className={cn(disabled && 'swiper--disabledCard')}
        centeredSlides={centeredSlides}
        modules={[Navigation, Pagination]}
        init={false}
        grabCursor={true}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        // onSlideChange={() => console.log('slide change')}
        onSwiper={(s: SwiperType) => {
          //   console.log('initialize swiper', s);
          setSwiper(s);
        }}
        navigation={{
          nextEl: `.swiper-button-next-${className}`,
          prevEl: `.swiper-button-prev-${className}`,
        }}
        pagination={showPaginaton ? pagination : showPaginaton}
        breakpoints={breakpoints}
      >
        {items?.map((slide, index) => (
          <SwiperSlide
            className='slider__item'
            key={`slider-item-${index}-${slide?.uniName}-${slide?.year}`}
          >
            <UniversityCard
              {...slide}
              disabled={disabled}
              index={index}
              showIcons={showIcons}
              slideId={slide.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
