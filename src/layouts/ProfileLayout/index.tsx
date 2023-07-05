import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

//styles
import './styles.scss';
//constants
import { ROUTES } from '../../constants';
//context
import { useAuth } from '../../context';
//components
import { ProfileHeader, ProfileFooter } from '../../components';

export const ProfileLayout = () => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token && !auth.initLoadingToken) {
    return <Navigate to={ROUTES.signIn} state={{ from: location }} replace />;
  }
  return (
    <div className='profileLayout'>
      <ProfileHeader />
      <div className='profileLayout__container'>
        <Outlet />
      </div>
      <ProfileFooter />
    </div>
  );
};
