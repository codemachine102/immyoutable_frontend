import React, { HTMLAttributes, FC, useState, useEffect } from 'react';
import cn from 'classnames';
//@ts-ignore
import SumsubWebSdk from '@sumsub/websdk-react';

//styles
import './styles.scss';
import axiosApiInstance from '../../../api/axios';

interface ProfileSumsubProps extends HTMLAttributes<HTMLDivElement> {}

export const ProfileSumsub: FC<ProfileSumsubProps> = ({}) => {
  const [accessToken, setAccessToken] = useState('');

  const getSumsubAccessToken = async () => {
    try {
      const { data } = await axiosApiInstance.get(
        `private/user/identity-verfication/request`
      );
      // console.log('getSumsubAccessToken data', data);
      if (data?.success) {
        setAccessToken(data?.data?.token);
      }
      return data?.data?.token;
    } catch (e) {
      console.log('getSumsubAccessToken error', e);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      getSumsubAccessToken();
    }
  }, [accessToken]);

  return (
    <div className={cn('profileSumsub')}>
      {accessToken && (
        <SumsubWebSdk
          accessToken={accessToken}
          expirationHandler={() => {}}
          config={{
            uiConf: {
              customCssStr: style,
              customBodyClass: 'profileSumsub__sdkUi',
            },
          }}
          options={{
            adaptIframeHeight: true,
          }}
          onMessage={(type: any, payload: any) => {
            // console.log('SumsubWebSdk onMessage', type, payload);
          }}
          onError={(error: any) => {
            console.log('SumsubWebSdk onError', error);
          }}
          className='profileSumsub__sdk'
        />
      )}
    </div>
  );
};

const style = `body.profileSumsub__sdkUi {
          // background-color: red;
      }
      .step .title,.step.active .title {
        color: white;
      }
      .sumsub-logo {
        color: white;
      }
      p,h2,h3,h4,ul li,.checkbox,.radio-item, .change a,.review-data h3,.ident-steps .ident-step {
        color: white;
      }
      section.content {
        background-color: transparent;
      }
      .mobile-button h3,.upload-item h4,.list li {
        color: #2a348f;
      }
      .applicant-requests .change p a, .applicant-requests .resend p a {
        color: #0882d9;
        text-decoration: none;
      }
      .ident-step.process .bullet {
        color: #0882d9;
      }
      .error-message-popup p {
        color: #3e4a5a;
      }
      `;
