import React, { FC, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

//styles
import './styles.scss';
//constants
import { ROUTES } from '../../../constants';
//assets
import { homeFooterBgIcon } from '../../../assets/icons';
import { logoImg } from '../../../assets/img';
//utils
import { isDev } from '../../../utils';

interface OnboardingFooterProps extends HTMLAttributes<HTMLDivElement> {
  margin?: boolean;
}

export const OnboardingFooter: FC<OnboardingFooterProps> = ({
  margin = false,
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
           in place of 'smooth' */
    });
  };
  const development = isDev();

  // if (!development) return <div className={cn('onboardingFooter')}></div>;
  return (
    <div
      className={cn('onboardingFooter', margin && 'onboardingFooter--margin')}
    >
      <ul className='onboardingFooter__menu'>
        <li>
          <Link to={ROUTES.terms}>Terms of use</Link>
        </li>
        <li>
          <Link to={ROUTES.privacy}>Privacy policy</Link>
        </li>
        <li>
          <Link to={ROUTES.faq} className='profileFooter__link'>
            Help center
          </Link>
        </li>
      </ul>
      {margin && (
        <div className='onboardingFooter__logo'>
          <img
            src={homeFooterBgIcon}
            className='onboardingFooter__logo_bg'
            alt='Footer Logo Background'
          />
          <img
            src={logoImg}
            className='onboardingFooter__logo_img pointer'
            alt='Footer Logo'
            onClick={scrollToTop}
          />
        </div>
      )}
    </div>
  );
};
