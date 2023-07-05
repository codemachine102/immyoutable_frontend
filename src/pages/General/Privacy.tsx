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

export const Privacy = () => {
  const navigate = useNavigate();
  const common = useCommon();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // console.log(common.policy);

    if (!common.policy) {
      common.getPolicy();
    }
  }, [common]);

  return (
    <div className='general generalPrivacy'>
      <Breadcrumbs title='Privacy policy' />
      <div className='general__header'>
        <img
          src={arrowBackIcon}
          className='general__headerArrow'
          onClick={goBack}
          alt='Back Button'
        />
        <h2 className='general__title'>Privacy policy</h2>
      </div>
      <div className='general__text'>
        {common?.policy?.privacyPolicyItems &&
          !!common.policy.privacyPolicyItems.length &&
          common?.policy?.privacyPolicyItems.map((term, index) => (
            <p key={`${term.id}-${index}`}>{term?.itemText}</p>
          ))}
        {/* <p>
          At immyoutable, protecting your personal information is of utmost
          importance. This privacy policy outlines the types of personal
          information we collect, the purposes for which we use it, and the
          steps we take to protect it. Our goal is to be transparent about our
          data practices and provide you with control over your personal
          information.
        </p>
        <p>
          We collect information that you voluntarily provide to us, such as
          your name, email address, and educational credentials. This
          information is used to verify your identity and create a secure,
          immutable record of your credentials on the blockchain. We also
          collect information related to your use of the immyoutable platform,
          such as the tokens you create and transfer, in order to provide you
          with a seamless and efficient experience. This information is stored
          securely on our servers and is only accessible to authorized
          Immyoutable personnel for the purpose of providing and improving our
          services.
        </p>
        <p>
          immyoutable takes the protection of your personal information
          seriously and employs industry-standard security measures to safeguard
          your data. We regularly review and update our security measures to
          ensure that your information is protected from unauthorized access,
          use, or disclosure.
        </p>
        <p>
          We are committed to being transparent about our data practices and
          providing you with control over your personal information. If you have
          any questions or concerns, please contact us at{' '}
          <a href='mailto:support@immyoutable.com'>support@immyoutable.com</a>
        </p> */}
      </div>
    </div>
  );
};
