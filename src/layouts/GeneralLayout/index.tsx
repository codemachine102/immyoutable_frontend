import React from 'react';
import { Outlet } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { ProfileHeader, ProfileFooter } from '../../components';

export const GeneralLayout = () => {
  return (
    <div className='generalLayout'>
      <ProfileHeader />
      <div className='generalLayout__container'>
        <Outlet />
      </div>
      <ProfileFooter />
    </div>
  );
};
