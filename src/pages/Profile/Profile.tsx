import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import './styles.scss';
//components
import {
  Button,
  ProfileChecklist,
  ProfileEducation,
  ProfilePassword,
  ProfilePersonalCard,
  ProfilePersonalInfo,
  // ProfileWork,
  ShareButton,
} from '../../components';
//constants
import { ROUTES, screenResolutions } from '../../constants';
//context
import { useAuth, useDesign } from '../../context';
//utils
import { formatDateMDY } from '../../utils';
//hooks
import { useWindowSize } from '../../hooks';

export const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const design = useDesign();
  const size = useWindowSize();
  // const [allVerified, setAllVerified] = useState(false);

  const gotToEditProfile = () => {
    navigate(ROUTES.profileEdit);
  };

  const date = useMemo(() => {
    const birthdate = auth.userProfile?.user?.birthdate;
    const slicedBirthdate = birthdate?.endsWith('Z')
      ? birthdate?.slice(0, -1)
      : birthdate;
    return slicedBirthdate ? new Date(slicedBirthdate) : '';
  }, [auth.userProfile?.user?.birthdate]);

  const personaladnUniversityInfo = useMemo(
    () => [
      {
        data: [
          {
            title: 'Username',
            text: auth.userProfile?.user?.nickname,
          },
          {
            title: 'Name',
            text: `${auth.userProfile?.user?.firstName} ${auth.userProfile?.user?.lastName}`,
          },
        ],
      },
      {
        data: [
          {
            title: 'Date of birth',
            text: date && formatDateMDY(date),
          },
          {
            title: 'Phone number',
            text: auth.userProfile?.user?.phone,
          },
          {
            title: 'Email',
            text: auth.userProfile?.user?.email,
          },
        ],
      },
      {
        data: [
          {
            title: 'BIO',
            text: auth.userProfile?.student?.bio,
            full: true,
          },
        ],
      },
    ],
    [auth.userProfile, date]
  );

  const allVerified = useMemo(
    () =>
      auth.userProfile?.user?.isIdentityVerified &&
      auth.userProfile?.student?.isDegreeVerified &&
      auth.userProfile?.user?.isPhoneVerified,
    [auth?.userProfile]
  );

  const ishigherMD = size.width && size.width > screenResolutions.md;
  const ishigherXs = size.width && size.width > screenResolutions.xs;

  // const showSliderInTop = allVerified && !ishigherMD && ishigherXs;
  // const showSliderInTop = false;

  useEffect(() => {
    design.getMintedCards();
  }, []);

  return (
    <div className='profile'>
      <div className='space-beetwen flex-baseline'>
        <div className='flex-baseline'>
          <h2 className='profile__title'>Profile</h2>
          <Button
            text='edit'
            buttonType='text'
            className='ml24'
            onClick={gotToEditProfile}
          />
        </div>
        <ShareButton />
      </div>
      <div className='profile__info profile__info--columnXs'>
        <ProfilePersonalCard className='profile__personal' />
        {ishigherMD ? (
          <ProfilePersonalInfo
            title='Personal info'
            data={personaladnUniversityInfo}
            className='flex1'
            containerClassName='flex1'
          />
        ) : (
          // (!allVerified || ishigherXs) && (
          <div className='profile__infoLeft'>
            {/* {!allVerified && ( */}
            <ProfileChecklist className='profile__checklist' />
            {/* )} */}
            {ishigherXs && <ProfilePassword />}
          </div>
          // )
        )}
      </div>
      <div className='profile__info profile__info--columnMd'>
        {ishigherMD ? (
          <div className='profile__infoLeft'>
            {/* {!allVerified && ( */}
            <ProfileChecklist className='profile__checklist' />
            {/* )} */}
            <ProfilePassword />
          </div>
        ) : (
          <ProfilePersonalInfo
            title='Personal info'
            data={personaladnUniversityInfo}
            className='flex1'
            containerClassName='flex1'
          />
        )}
        {/* <div className='overflow-hidden'> */}
        {!!design.mintedCards?.length && (
          <div className='profile__sliders'>
            <ProfileEducation
              className='profile__education'
              slidesPerView={'auto'}
              breakpoints={{
                [screenResolutions.sm]: {
                  slidesPerView: 3,
                },
              }}
              sliderClassName='profile__educationSlider'
            />
            {/* <ProfileWork disabled className='profile__work' disabledSlider /> */}
          </div>
        )}
        {/* </div> */}
      </div>
      {!ishigherXs && <ProfilePassword />}
    </div>
  );
};
