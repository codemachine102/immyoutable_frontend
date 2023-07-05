import React from 'react';

//styles
import './styles.scss';
//components
import { DesignTabs } from '../../components';
//assets

export const Design = () => {
  return (
    <div className='profile'>
      <div className='space-beetwen'>
        <h2 className='profile__title'>Diploma design</h2>
      </div>
      <DesignTabs />
    </div>
  );
};
