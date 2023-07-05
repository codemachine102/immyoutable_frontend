import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

//styles
import './styles.scss';
//constants
import { ROUTES } from '../../../constants';

export const ProfileFooter = () => {
  return (
    <div className='profileFooter__container'>
      <div className={cn('profileFooter')}>
        <ul className='profileFooter__menu'>
          <li>
            <Link to={ROUTES.terms} className='profileFooter__link'>
              Terms of use
            </Link>
          </li>
          <li>
            <Link to={ROUTES.privacy} className='profileFooter__link'>
              Privacy policy
            </Link>
          </li>
          <li>
            <Link to={ROUTES.faq} className='profileFooter__link'>
              Help center
            </Link>
          </li>
        </ul>
        {/* <img src={logoImg} className='profileFooter__logo' alt='Logo' /> */}
      </div>
    </div>
  );
};
