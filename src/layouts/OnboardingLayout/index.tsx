import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

//styles
import '../../scss/toast.scss';
import './styles.scss';
//components
import { OnboardingHeader } from '../../components';

export const OnboardingLayout = () => {
  useEffect(() => {
    document.body.classList.add('body__onboarding');

    return () => {
      document.body.classList.remove('body__onboarding');
    };
  }, []);

  return (
    <div className='onboarding'>
      <OnboardingHeader className='onboarding__header' />
      <Outlet />
    </div>
  );
};
