import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

//styles
import './styles.scss';
//hooks
import { useOnClickOutside } from '../../../hooks';
//asssets
import {
  headerHomeIcon,
  headerHomeActiveIcon,
  headerDesignIcon,
  headerDesignActiveIcon,
  headerProfileIcon,
  headerProfileActiveIcon,
  // headerJobsIcon,
  // headerJobsActiveIcon,
} from '../../../assets/icons';
import { headerLogoImg, headerProfileActiveImg } from '../../../assets/img';
//utils
import { isOnPage } from '../../../utils';
//constants
import { ROUTES, subscrPlans } from '../../../constants';
//components
import { Dropdown } from '../../Dropdown';
import { Button } from '../../Button';
import { ProfileLogoutModal } from '../ProfileLogoutModal';
//context
import { useAuth } from '../../../context';

export const ProfileHeader = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [headerActive, setHeaderActive] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [openModalLogout, setOpenModalLogout] = useState<boolean>(false);

  const scrollYHeaderActive = 30;

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setDropdownOpen(false));

  const linkClassnames = ({ isActive }: { isActive?: boolean }) =>
    cn(
      'profileHeader__menuLink',
      isActive ? 'profileHeader__menuLink--active' : undefined
    );

  const changeHeader = () => {
    if (window.scrollY >= scrollYHeaderActive) {
      setHeaderActive(true);
    } else {
      setHeaderActive(false);
    }
  };

  const navigateToSignIn = () => {
    navigate(ROUTES.signIn);
  };
  const navigateToSignUp = () => {
    navigate(ROUTES.signUp);
  };

  useEffect(() => {
    changeHeader();
    // adding the event when scroll
    window.addEventListener('scroll', changeHeader);
  });

  const profileActiveRoutes = [
    ROUTES.profile,
    ROUTES.billing,
    // ROUTES.profileSettings,
    // ROUTES.plan,
    ROUTES.privacy,
    ROUTES.terms,
  ];

  const AuthedMenu = () => (
    <ul className='profileHeader__menu'>
      <NavLink to={ROUTES.profileHome} className={linkClassnames}>
        <div className='profileHeader__menuImg'>
          <img
            src={
              isOnPage(location, [ROUTES.profileHome])
                ? headerHomeActiveIcon
                : headerHomeIcon
            }
            alt='Header Home'
          />
        </div>
        <span className='profileHeader__menuText'>Home</span>
        {isOnPage(location, [ROUTES.profileHome]) && (
          <span className='profileHeader__menuEllipse' />
        )}
      </NavLink>
      <NavLink to={ROUTES.design} className={linkClassnames}>
        <div className='profileHeader__menuImg'>
          <img
            src={
              isOnPage(location, [ROUTES.design])
                ? headerDesignActiveIcon
                : headerDesignIcon
            }
            alt='Header Design'
          />
          <span className='profileHeader__menuNumber'>1</span>
        </div>
        <span className='profileHeader__menuText'>Design</span>
        {isOnPage(location, [ROUTES.design]) && (
          <span className='profileHeader__menuEllipse' />
        )}
      </NavLink>
      {/* <NavLink to={ROUTES.jobs} className={linkClassnames}>
        <div className='profileHeader__menuImg'>
          <img
            src={
              isOnPage(location, [ROUTES.jobs])
                ? headerJobsActiveIcon
                : headerJobsIcon
            }
            alt='Header Jobs'
          />
        </div>
        <span className='profileHeader__menuText'>Jobs</span>
        {isOnPage(location, [ROUTES.jobs]) && (
          <span className='profileHeader__menuEllipse' />
        )}
      </NavLink> */}
      <div
        className={cn(
          'profileHeader__menuLink',
          isOnPage(location, profileActiveRoutes)
            ? 'profileHeader__menuLink--active'
            : undefined
        )}
        onClick={() => setDropdownOpen((prev) => !prev)}
        ref={ref}
      >
        <div
          className={cn(
            'profileHeader__menuImg',
            isOnPage(location, profileActiveRoutes) &&
              'profileHeader__menuImg--profile'
          )}
        >
          <img
            src={
              isOnPage(location, profileActiveRoutes)
                ? headerProfileActiveImg
                : headerProfileIcon
            }
            alt='Header Profile'
          />
        </div>
        <span className='profileHeader__menuText'>Profile</span>
        {isOnPage(location, profileActiveRoutes) && (
          <span className='profileHeader__menuEllipse' />
        )}
        <Dropdown
          dropdownOpen={dropdownOpen}
          items={[
            {
              text: 'View profile',
              route: ROUTES.profile,
            },
            // {
            //   text: 'Settings',
            //   route: ROUTES.profileSettings,
            // },
            {
              text: 'Billing',
              route: ROUTES.billing,
            },
            // {
            //   text: 'Privacy',
            //   route: ROUTES.privacy,
            // },
            {
              text: 'Contact us',
              route: ROUTES.contactUs,
            },
            {
              text: 'Log out',
              onClick: () => setOpenModalLogout(true),
            },
            {
              text: (
                <>
                  Plan
                  <br />
                  <span
                    className={cn(
                      'profileHeader__menuPlan',
                      auth?.userSubscrPlan?.subscriptionPlan.id ===
                        subscrPlans.premium.id &&
                        'profileHeader__menuPlan--premium'
                    )}
                  >
                    {auth?.userSubscrPlan?.subscriptionPlan.plan}
                  </span>
                </>
              ),
              // route: ROUTES.plan,
            },
          ]}
        />
      </div>
    </ul>
  );

  const UnAuthedMenu = () => (
    <div className='profileHeader__buttons'>
      <Button
        text='Log in'
        className='profileHeader__button'
        buttonType='outline'
        onClick={navigateToSignIn}
      />
      <Button
        text='Sign up'
        className='profileHeader__button'
        onClick={navigateToSignUp}
      />
    </div>
  );

  return (
    <>
      <div className='profileHeader profileHeader--empty' />
      <div
        className={cn(
          'profileHeader__container',
          headerActive && 'profileHeader__container--active'
        )}
      >
        <div className={cn('profileHeader')}>
          <Link to={ROUTES.profileHome} className='align-center'>
            <img
              src={headerLogoImg}
              className='profileHeader__logo'
              alt='Logo'
            />
          </Link>
          {!auth.token && !auth.initLoadingToken ? (
            <UnAuthedMenu />
          ) : (
            <AuthedMenu />
          )}
        </div>
      </div>
      <ProfileLogoutModal
        openModalLogout={openModalLogout}
        setOpenModalLogout={setOpenModalLogout}
      />
    </>
  );
};
