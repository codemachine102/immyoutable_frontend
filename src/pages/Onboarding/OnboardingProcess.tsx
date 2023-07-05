import React from 'react';

//styles
import './styles.scss';
//components
import {
  Button,
  Animate,
  ArrowDiamond,
  OnboardingFooter,
} from '../../components';
//assets
import {
  homeMailImg,
  homePhoneImg,
  homeIdImg,
  homeIpadImg,
  homeIpadBgImg,
  homeAstronautImg,
  homeCoinsImg,
} from '../../assets/img';
import {
  homeAstronautBgIcon,
  homeCoinsBgIcon,
  homeTwitterIcon,
  homeInstagramIcon,
  homeFacebookIcon,
  homeIdentifyPlanetIcon,
  homeAuthenticatePlanetIcon,
  homeDesignStarsIcon,
  homeDesignStarsIcon2,
  homeDesignPlanetIcon,
  homeDesignPlanetIcon2,
  homeTokenizePlanetIcon,
  homeCollectPlanetIcon,
  homeCollectPlanetIcon2,
} from '../../assets/icons';

export const OnboardingProcess = () => {
  return (
    <div className='onboarding__bg'>
      <div className='onboarding__container'>
        <div className='onboardingMain'>
          <h2 className='onboarding__title onboarding__title--center mb48'>
            <Animate.SlideLeftIn>Universal</Animate.SlideLeftIn>
            <Animate.SlideLeftIn timeout={300}>
              <span className='onboarding__title--gradient'>Blockchain</span>{' '}
            </Animate.SlideLeftIn>
            <Animate.SlideLeftIn timeout={600}>
              Authentication
            </Animate.SlideLeftIn>
          </h2>
          <Animate.SlideRightIn timeout={600}>
            <p className='onboarding__text onboardingMain__text mb48'>
              Our mission is to utilize blockchain technologies to authentic
              diplomas into digital assets
            </p>
          </Animate.SlideRightIn>
          <Animate.FadeUp timeout={600}>
            <Button
              text='Own yourself'
              className='onboarding__button'
              color='orange'
            />
          </Animate.FadeUp>
        </div>
      </div>
      <div className='onboarding__container'>
        <div className='onboardingIdentify'>
          <Animate.SlideLeftIn>
            <h2 className='onboarding__title onboarding__title--center mb48'>
              <span className='onboarding__title--gradientPurple'>
                Identify
              </span>{' '}
              the individual
            </h2>
          </Animate.SlideLeftIn>
          <Animate.SlideRightIn>
            <p className='onboarding__text'>
              Our platform validates students through EDU emails, phones,
              government or state issued ID’s to eliminate fraudulent profiles
            </p>
          </Animate.SlideRightIn>
          <div className='onboardingIdentify__container'>
            <Animate.FadeUp className='onboardingIdentify__item'>
              <img src={homeMailImg} alt='Mail' />
              <span>Mail</span>
            </Animate.FadeUp>
            <Animate.FadeUp className='onboardingIdentify__item' timeout={300}>
              <img src={homePhoneImg} alt='Phone' />
              <span>Phone</span>
            </Animate.FadeUp>
            <Animate.FadeUp className='onboardingIdentify__item' timeout={600}>
              <img src={homeIdImg} alt='Id' />
              <span>ID</span>
            </Animate.FadeUp>
          </div>
        </div>
        {/* <img src={starsIdentifyIcon} className='onboardingIdentify__stars' /> */}
      </div>
      <div className='onboarding__container onboarding__container--left'>
        <div className='onboardingAuthenticate'>
          <h2 className='onboarding__title mb48'>
            <Animate.SlideLeftIn>
              <span className='onboarding__title--gradientPurple'>
                Authenticate
              </span>
            </Animate.SlideLeftIn>{' '}
            <Animate.SlideLeftIn timeout={300}>the degree</Animate.SlideLeftIn>
          </h2>
          <Animate.SlideRightIn timeout={300}>
            <p className='onboarding__text mb48'>
              Mapping degree traits & collecting the data directly from the
              university or college
            </p>
          </Animate.SlideRightIn>
          <Animate.FadeUp
            className='onboarding__Gradientbutton onboarding__Gradientbutton--grey'
            timeout={300}
          >
            <span>Own yourself</span>
            <ArrowDiamond color='grey' />
          </Animate.FadeUp>
        </div>
        <div className='onboardingAuthenticate__ipad'>
          <img
            src={homeIpadBgImg}
            className='onboardingAuthenticate__ipad_bg'
            alt='Ipad Background'
          />
          <img
            src={homeIpadImg}
            className='onboardingAuthenticate__ipad_img'
            alt='Ipad'
          />
        </div>
        <img
          src={homeIdentifyPlanetIcon}
          className='onboardingAuthenticate__planetIdentify'
          alt='Authenticate Planet 1'
        />
        <img
          src={homeAuthenticatePlanetIcon}
          className='onboardingAuthenticate__planetAuthenticate'
          alt='Authenticate Planet 2'
        />
      </div>
      <div className='onboarding__container onboarding__container--right'>
        <div className='onboardingDesign'>
          <h2 className='onboarding__title mb48'>
            <Animate.SlideLeftIn>
              <span className='onboarding__title--gradientPurple'>Design</span>
            </Animate.SlideLeftIn>
            <Animate.SlideLeftIn timeout={300}>your NFT</Animate.SlideLeftIn>
          </h2>
          <Animate.SlideRightIn timeout={300}>
            <p className='onboarding__text mb48'>
              Fully customize & create a personalized university themed NFT
            </p>
          </Animate.SlideRightIn>
          <Animate.FadeUp
            className='onboarding__Gradientbutton onboarding__Gradientbutton--orange'
            timeout={300}
          >
            <span>Own yourself</span>
            <ArrowDiamond color='orange' />
          </Animate.FadeUp>
        </div>
        <div className='onboardingDesign__astronaut'>
          <img
            src={homeAstronautBgIcon}
            className='onboardingDesign__astronaut_bg'
            alt='Astronaut Background'
          />
          <img
            src={homeAstronautImg}
            className='onboardingDesign__astronaut_img'
            alt='Astronaut'
          />
        </div>
        <div className='onboardingDesign__stars'>
          <img
            src={homeDesignStarsIcon}
            className='onboardingDesign__stars1'
            alt='Design Stars 1'
          />
          <img
            src={homeDesignStarsIcon2}
            className='onboardingDesign__stars2'
            alt='Design Stars 2'
          />
        </div>
        <div className='homeDesign__planet'>
          <img
            src={homeDesignPlanetIcon}
            className='onboardingDesign__planet1'
            alt='Design Planet 2'
          />
          <img
            src={homeDesignPlanetIcon2}
            className='onboardingDesign__planet2'
            alt='Design Planet 2'
          />
        </div>
      </div>
      <div className='onboarding__container onboarding__container--left'>
        <div className='onboardingTokenize'>
          <h2 className='onboarding__title mb48'>
            <Animate.SlideLeftIn>
              <span className='onboarding__title--gradientPurple'>
                Tokenize
              </span>
            </Animate.SlideLeftIn>
            <Animate.SlideLeftIn timeout={300}>your data</Animate.SlideLeftIn>
          </h2>
          <Animate.SlideRightIn timeout={300}>
            <p className='onboarding__text mb48'>
              With one swipe securely store your properties
              via&#160;smart&#160;contract by minting, freezing and transferring
            </p>
          </Animate.SlideRightIn>
          <Animate.FadeUp
            className='onboarding__Gradientbutton onboarding__Gradientbutton--purple'
            timeout={300}
          >
            <span>Own yourself</span>
            <ArrowDiamond color='purple' />
          </Animate.FadeUp>
        </div>
        <div className='onboardingTokenize__coins'>
          <img
            src={homeCoinsBgIcon}
            className='onboardingTokenize__coins_bg'
            alt='Coins Background'
          />
          <img
            src={homeCoinsImg}
            className='onboardingTokenize__coins_img'
            alt='Coins'
          />
        </div>
        <div className='onboardingTokenize__planet'>
          <img
            src={homeTokenizePlanetIcon}
            className='onboardingTokenize__planetImg'
            alt='Tokenize planet'
          />
        </div>
      </div>
      <div className='onboarding__container'>
        <div className='onboardingCollect'>
          <h2 className='onboarding__title onboarding__title--center mb48'>
            <Animate.SlideLeftIn>
              <span className='onboarding__title--gradientPurple'>Collect</span>
            </Animate.SlideLeftIn>{' '}
            <Animate.SlideLeftIn timeout={300}>
              digital assets
            </Animate.SlideLeftIn>
          </h2>
          <Animate.SlideRightIn>
            <p className='onboarding__text mb16'>Own yourself</p>
          </Animate.SlideRightIn>
          <Animate.SlideRightIn timeout={300}>
            <p className='onboarding__text mb16'>Share your achievements</p>
          </Animate.SlideRightIn>
          <Animate.SlideRightIn timeout={600}>
            <p className='onboarding__text mb48'>Immerse yourself into web3</p>
          </Animate.SlideRightIn>
          <div className='onboardingCollect__container'>
            <Animate.FadeUp className='onboardingCollect__item'>
              <a href='/'>
                <img src={homeTwitterIcon} alt='twitter' />
              </a>
            </Animate.FadeUp>
            <Animate.FadeUp className='onboardingCollect__item' timeout={300}>
              <a href='/'>
                <img src={homeInstagramIcon} alt='instagram' />
              </a>
            </Animate.FadeUp>
            <Animate.FadeUp className='onboardingCollect__item' timeout={600}>
              <a href='/'>
                <img src={homeFacebookIcon} alt='facebook' />
              </a>
            </Animate.FadeUp>
          </div>
        </div>
        <div className='onboardingCollect__planetTop'>
          <img
            src={homeCollectPlanetIcon}
            className='onboardingCollect__planetTopImg'
            alt='Collect planet Top'
          />
        </div>
        <div className='onboardingCollect__planetBottom'>
          <img
            src={homeCollectPlanetIcon2}
            className='onboardingCollect__planetBottomImg'
            alt='Collect planet Bottom'
          />
        </div>
      </div>
      <OnboardingFooter margin />
    </div>
  );
};
