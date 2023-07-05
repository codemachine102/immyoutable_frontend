import React from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper';
import { Helmet } from 'react-helmet';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
// import 'swiper/swiper.min.css';
// import 'swiper/modules/effect-coverflow/effect-coverflow.min.css';
// import 'swiper/modules/navigation/navigation.min.css';

//styles
import './styles.scss';
// constants
import { universities, screenResolutions } from '../../constants';
//assets
import { ownYourselfImg } from '../../assets/img';
//components
import { OnboardingFooter } from '../../components';
//hooks
import { useWindowSize } from '../../hooks';

const CardImage = ({ el, index, touched }: any) => {
  return (
    <div className='onboardingHome__card'>
      <img
        src={el.bigImg}
        className={cn(
          'onboardingHome__cardImg',
          touched && 'onboardingHome__cardImg--touched'
        )}
        alt='Onboarding Platform'
      />
      <img
        src={el.gif}
        className={cn(
          'onboardingHome__cardImg',
          'onboardingHome__cardImg--gif',
          touched && 'onboardingHome__cardImg--touched'
        )}
        alt='Onboarding Platform'
      />
    </div>
  );
};

export const OnboardingHome = () => {
  // const [touched, setTouched] = useState(false);
  const size = useWindowSize();
  const interleaveEffect = {
    onProgress: function (swiper: any, progress: any) {
      // console.log('swiper', swiper.params?.slidesPerView);
      const hideAfterSlide = Math.ceil((swiper.params?.slidesPerView - 1) / 2);
      // console.log('hideAfterSlide', hideAfterSlide);
      // console.log('size.width', size.width, screenResolutions.xl);
      const ishigherXL = size.width && size.width > screenResolutions.xl;
      const ishigherXS = size.width && size.width > screenResolutions.xs;
      const translateStep = ishigherXS ? 50 : 25;

      for (let i = 0; i < swiper.slides.length; i++) {
        let slide: HTMLElement = swiper.slides[i];
        //@ts-ignore
        const slideProgress = Math.abs(Math.round(slide.progress));

        // console.log('slideProgress', slideProgress, i);

        // console.log(slideProgress);
        if (slideProgress === 0) {
          //@ts-ignore
          slide.children[0].style.transform = `scale(1.5) translate(0, ${
            ishigherXS ? 30 : 25
          }px)`;
          slide.children[0].classList.add('onboardingHome__card--active');
          if (!ishigherXS) {
            //@ts-ignore
            slide.children[0].style.padding = '0 7px';
          }
        } else {
          //@ts-ignore
          slide.children[0].style.transform = `translate(0, -${
            slideProgress * translateStep - translateStep
          }px)`;
          slide.children[0].classList.remove('onboardingHome__card--active');
          //@ts-ignore
          slide.children[0].style.padding = '0';
        }

        if (ishigherXL && slideProgress > hideAfterSlide) {
          //@ts-ignore
          slide.children[0].style.visibility = 'hidden';
        } else {
          //@ts-ignore
          slide.children[0].style.visibility = 'visible';
        }
      }
    },

    onTouchStart: function (swiper: any) {
      // setTouched(true);
      for (let i = 0; i < swiper.slides.length; i++) {
        let slide: HTMLElement = swiper.slides[i];
        slide.style.transition = '';
      }
    },

    onSetTransition: function (swiper: any, speed: any) {
      for (let i = 0; i < swiper.slides.length; i++) {
        let slide: HTMLElement = swiper.slides[i];
        slide.style.transitionDuration = speed + 'ms';
      }
    },

    onInit: function (swiper: any) {
      // console.log('onInit');
    },

    onAfterInit: function (swiper: any) {
      // console.log('onAfterInit');
    },

    onTouchEnd: function (swiper: any) {
      // setTouched(false);
    },
  };

  return (
    <>
      <Helmet>
        <link rel='preload' as='image' href={ownYourselfImg} />
        {/* {universities?.map((el, index) => (
          <React.Fragment key={`uni-link-preload-${index}`}>
            <link rel='preload' as='image' href={`${el.bigImg}`} />
            <link rel='preload' as='image' href={`${el.gif}`} />
          </React.Fragment>
        ))} */}
      </Helmet>
      <div className='onboarding__bgGrey'>
        <div className='onboardingHome'>
          <img
            src={ownYourselfImg}
            className='onboardingHome__img'
            alt='Own Yourself'
          />
          <div className='onboardingHome__cards'>
            <div
              className={cn(
                'onboardingHome__sliderButton',
                'onboardingHome__sliderButton--prev'
              )}
            ></div>
            <div
              className={cn(
                'onboardingHome__sliderButton',
                'onboardingHome__sliderButton--next'
              )}
            ></div>
            <Swiper
              init={true}
              speed={1000}
              effect={'coverflow'}
              centeredSlides
              spaceBetween={-40}
              slidesPerView={2.9}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
              loop={true}
              className='onboardingHome__slider'
              slideActiveClass='onboardingHome__slide--active'
              slideNextClass='onboardingHome__slide--next'
              slidePrevClass='onboardingHome__slide--prev'
              grabCursor={false}
              allowTouchMove={false}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 1,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Navigation]}
              initialSlide={universities.length}
              navigation={{
                nextEl: `.onboardingHome__sliderButton--next`,
                prevEl: `.onboardingHome__sliderButton--prev`,
              }}
              breakpoints={{
                [screenResolutions.xs]: {
                  slidesPerView: 3.8,
                },
                [screenResolutions.sm]: {
                  slidesPerView: 5.4,
                },
                [screenResolutions.md]: {
                  slidesPerView: 7.6,
                },
                [screenResolutions.lg]: {
                  slidesPerView: 8.8,
                },
              }}
              {...interleaveEffect}
            >
              {[...universities, ...universities, ...universities]?.map(
                (el, index) => (
                  <SwiperSlide
                    className='onboardingHome__slide'
                    key={`onboardingHome__card--${index}`}
                  >
                    <CardImage
                      el={el}
                      index={index}
                      // touched={touched}
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </div>
        <OnboardingFooter />
      </div>
    </>
  );
};
