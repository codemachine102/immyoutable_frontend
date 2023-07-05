import React from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import {
  Button,
  ProfilePassword,
  ProfilePersonalCard,
  ProfilePersonalInfo,
} from '../../components';
//constants
import { personalInfo, ROUTES, universityInfo } from '../../constants';

export const ProfileSettings = () => {
  const navigate = useNavigate();

  const gotToEditProfile = () => {
    navigate(ROUTES.profileEdit);
  };

  return (
    <div className='profile'>
      <div className='flex-baseline'>
        <h2 className='profile__title'>Profile Settings</h2>
        <Button
          text='edit'
          buttonType='text'
          className='ml24'
          onClick={gotToEditProfile}
        />
      </div>
      <div className='profile__info'>
        <ProfilePersonalCard />
        <div className='profile__infoBody'>
          <ProfilePersonalInfo title='Personal Info' data={personalInfo} />
          <ProfilePersonalInfo title='University' data={universityInfo} />
          <ProfilePassword />
        </div>
      </div>
    </div>
  );
};
