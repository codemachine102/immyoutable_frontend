import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import { Breadcrumbs } from '../../components';
//assets
import { arrowBackIcon } from '../../assets/icons';
//context
import { useCommon } from '../../context';

export const Terms = () => {
  const navigate = useNavigate();
  const common = useCommon();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // console.log(common.terms);

    if (!common.terms) {
      common.getTerms();
    }
  }, [common]);

  return (
    <div className='general generalTerms'>
      <Breadcrumbs title='Terms of use' />
      <div className='general__header'>
        <img
          src={arrowBackIcon}
          className='general__headerArrow'
          onClick={goBack}
          alt='Back Button'
        />
        <h2 className='general__title'>Terms of use</h2>
      </div>
      <div className='general__text'>
        {common?.terms?.termsAndConditionsItems &&
          !!common.terms.termsAndConditionsItems.length &&
          common?.terms?.termsAndConditionsItems.map((term, index) => (
            <p key={`${term.id}-${index}`}>{term?.itemText}</p>
          ))}
        {/* <p>
          Welcome to immyoutable, the platform that allows you to tokenize your
          credentials and build your digital identity. By accessing or using the
          platform, you are agreeing to comply with the terms and conditions set
          forth in these terms of use.
        </p>
        <p>
          In using the platform, you agree to provide accurate and complete
          information, to maintain the security of your account and to comply
          with all applicable laws and regulations. You are also responsible for
          maintaining the confidentiality of your account and password and for
          restricting access to your computer. You accept responsibility for all
          activities that occur under your account or password.
        </p>
        <p>
          By using the platform, you represent and warrant that you have the
          right, authority, and capacity to enter into this agreement and to
          abide by all of the terms and conditions set forth herein. If you are
          using the platform on behalf of a corporation, organization, or other
          entity, you represent and warrant that you have the authority to bind
          such entity to these terms and conditions.
        </p>
        <p>
          We reserve the right, at our discretion, to change, modify, add, or
          remove portions of these terms of use at any time. Your continued use
          of the platform following the posting of changes to these terms of use
          will mean you accept those changes.
        </p>
        <p>
          immyoutable and its affiliates are not responsible for any loss or
          damage arising from your failure to comply with these terms of use or
          for any unauthorized use of your account. immyoutable may, at its
          discretion, immediately terminate your use of the platform if you
          violate any of the terms of use or any applicable laws or regulations.
        </p>
        <p>
          We appreciate your use of the platform and your cooperation in
          maintaining its integrity. If you have any questions or comments,
          please contact us at{' '}
          <a href='mailto:support@immyoutable.com'>support@immyoutable.com</a>.
        </p> */}
      </div>
    </div>
  );
};
