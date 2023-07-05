import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//styles
import '../../scss/toast.scss';
import './styles.scss';
//constants
import { ROUTES } from '../../constants';
//styles
import { logoImg } from '../../assets/img';
//context
import { useAuth } from '../../context';

export const AuthLayout = ({ check = true }) => {
  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('body__auth');

    return () => {
      document.body.classList.remove('body__auth');
    };
  }, []);

  if (auth.token && !auth.initLoadingToken && check) {
    return (
      <Navigate
        to={auth.isFirstLogin ? ROUTES.profile : ROUTES.profileHome}
        state={{ from: location }}
        replace
      />
    );
  }
  return (
    <div className='authLayout__container'>
      <div className='authLayout__left'>
        <div className='authLayout__header'>
          <Link to={ROUTES.onboardingHome}>
            <img src={logoImg} className='authLayout__headerLogo' alt='Logo' />
          </Link>
        </div>
        <div className='authLayout__content'>
          <Outlet />
        </div>
        <ToastContainer
          className='toast__container'
          bodyClassName='toast__body'
          hideProgressBar
          toastClassName='toast__item'
          closeButton={false}
        />
      </div>
      <div className='authLayout__right'>
        <img src={logoImg} className='authLayout__rightLogo' alt='Logo' />
      </div>
    </div>
  );
};
