import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { Accordion, Breadcrumbs, Button } from '../../components';
//constants
import { ROUTES } from '../../constants';
//assets
import { arrowBackIcon } from '../../assets/icons';
//context
import { useAuth, useCommon } from '../../context';

export const FAQ = () => {
  const navigate = useNavigate();
  const common = useCommon();
  const auth = useAuth();

  const goBack = () => {
    navigate(-1);
  };
  const navigateToContactUs = () => {
    navigate(ROUTES.contactUs);
  };

  useEffect(() => {
    if (!common.faq) {
      common.getFaq();
    }
  }, [common]);

  return (
    <div className='general generalFaq'>
      <Breadcrumbs title='Frequently Asked Questions' />
      <div className='general__header'>
        <img
          src={arrowBackIcon}
          className='general__headerArrow'
          onClick={goBack}
          alt='Back Button'
        />
        <h2 className='general__title'>Frequently Asked&nbsp;Questions</h2>
      </div>
      <div className='generalFaq__container'>
        <Accordion faqs={common.faq} />
      </div>
      {auth.token && (
        <div className='generalFaq__text'>
          <span>Didn’t find an answer?</span>
          <Button
            onClick={navigateToContactUs}
            text='Contact us'
            buttonType='text'
          />
        </div>
      )}
    </div>
  );
};
