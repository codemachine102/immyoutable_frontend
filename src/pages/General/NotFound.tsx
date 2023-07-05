import React from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { Button } from '../../components';
//constants
import { screenResolutions } from '../../constants';
//assets
import { notFound2Img, notFoundMobileImg } from '../../assets/img';
//hooks
import { useWindowSize } from '../../hooks';

export const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const size = useWindowSize();

  return (
    <div className='general generalNotFound'>
      <div className='generalNotFound__container'>
        <h1 className='generalNotFound__title'>404</h1>
        <p className='generalNotFound__text'>Page not found</p>
        <Button text='Go back' onClick={goBack} />
      </div>
      <img
        src={
          size.width && size.width > screenResolutions.sm
            ? notFound2Img
            : notFoundMobileImg
        }
        className='generalNotFound__img'
        alt='Not Found'
      />
    </div>
  );
};
