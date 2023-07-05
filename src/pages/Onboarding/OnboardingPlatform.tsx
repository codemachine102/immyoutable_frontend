import React from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
// import 'swiper/swiper.min.css';
// import 'swiper/modules/effect-coverflow/effect-coverflow.min.css';

//styles
import './styles.scss';
//assets
import {
  platformDesignImg,
  platformHomeImg,
  platformProfileImg,
} from '../../assets/img';
//components
import { OnboardingFooter } from '../../components';

export const OnboardingPlatform = () => {
  const images = [
    platformProfileImg,
    platformHomeImg,
    platformDesignImg,
    platformProfileImg,
    platformHomeImg,
    platformDesignImg,
  ];

  return (
    <div className='onboarding__bgGrey'>
      <div className='onboardingPlatform'>
        <div className='onboardingPlatform__container'>
          <Swiper
            centeredSlides
            spaceBetween={-70}
            slidesPerView={2.7}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            loop={true}
            className='onboardingPlatform__slider'
            slideActiveClass='onboardingPlatform__slide--active'
            slideNextClass='onboardingPlatform__slide--next'
            slidePrevClass='onboardingPlatform__slide--prev'
            grabCursor={true}
          >
            {images?.map((slide, index) => (
              <SwiperSlide className='onboardingPlatform__slide'>
                <img
                  key={`onboardingPlatform__img--${index}`}
                  src={slide}
                  className={cn('onboardingPlatform__img')}
                  alt='Onboarding Platform'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <OnboardingFooter />
    </div>
  );
};
