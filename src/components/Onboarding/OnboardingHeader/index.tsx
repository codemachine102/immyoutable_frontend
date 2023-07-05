import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

//styles
import './styles.scss';
//assets
import { logoImg } from '../../../assets/img';
//constants
import { ROUTES, screenResolutions } from '../../../constants';
//utils
import { isDev, isOnPage } from '../../../utils';
//components
import { Button } from '../../Button';

interface OnboardingHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const OnboardingHeader: FC<OnboardingHeaderProps> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [headerActive, setHeaderActive] = useState<boolean>(false);

  const changeHeader = () => {
    const scrollYHeaderActive =
      window.innerWidth > screenResolutions.xs ? 80 : 25;
    if (window.scrollY >= scrollYHeaderActive) {
      setHeaderActive(true);
    } else {
      setHeaderActive(false);
    }
  };

  useEffect(() => {
    changeHeader();
    // adding the event when scroll
    window.addEventListener('scroll', changeHeader);
  });
  const navigateToSignIn = () => {
    navigate(ROUTES.signIn);
  };
  const navigateToSignUp = () => {
    navigate(ROUTES.signUp);
  };

  const linkClassnames = ({ isActive }: { isActive?: boolean }) =>
    cn(
      'profileHeader__menuLink',
      isActive ? 'profileHeader__menuLink--active' : undefined
    );

  const development = isDev();

  return (
    <div
      className={cn(
        'onboardingHeader',
        headerActive && 'onboardingHeader--active',
        className
      )}
    >
      <div className='onboardingHeader__img'>
        <img src={logoImg} alt='Logo' />
      </div>
      {development && (
        <div className='onboardingHeader__menu'>
          <NavLink to={ROUTES.onboardingHome} className={linkClassnames}>
            <span className='onboardingHeader__menuText'>Home</span>
            {isOnPage(location, [ROUTES.onboardingHome]) && (
              <span className='onboardingHeader__menuEllipse' />
            )}
          </NavLink>
          <NavLink to={ROUTES.onboardingProcess} className={linkClassnames}>
            <span className='onboardingHeader__menuText'>Process</span>
            {isOnPage(location, [ROUTES.onboardingProcess]) && (
              <span className='onboardingHeader__menuEllipse' />
            )}
          </NavLink>
          <NavLink to={ROUTES.onboardingPlatform} className={linkClassnames}>
            <span className='onboardingHeader__menuText'>Platform</span>
            {isOnPage(location, [ROUTES.onboardingPlatform]) && (
              <span className='onboardingHeader__menuEllipse' />
            )}
          </NavLink>
        </div>
      )}
      {/* {development && ( */}
      <div className='onboardingHeader__buttons'>
        <Button
          text='Log in'
          className='onboardingHeader__button onboardingHeader__button--login'
          buttonType='outline'
          onClick={navigateToSignIn}
        />
        <Button
          text='Sign up'
          className='onboardingHeader__button onboardingHeader__button--signup'
          onClick={navigateToSignUp}
        />
      </div>
      {/* )} */}
    </div>
  );
};
