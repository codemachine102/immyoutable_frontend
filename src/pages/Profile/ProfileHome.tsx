import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import {
  CryptoList,
  ProfilePersonalCard,
  ProfileEducation,
  // ProfileWork,
  // SidebarNews,
  Newsfeed,
  SingleNewsPlay,
  ProfileChecklist,
} from '../../components';
//constants
import { screenResolutions } from '../../constants';
//hooks
import { useWindowSize } from '../../hooks';
//context
import { useAuth, useDesign } from '../../context';

export const ProfileHome = () => {
  const auth = useAuth();
  const design = useDesign();
  const size = useWindowSize();

  const allVerified = useMemo(
    () =>
      auth.userProfile?.user?.isIdentityVerified &&
      auth.userProfile?.student?.isDegreeVerified &&
      auth.userProfile?.user?.isPhoneVerified,
    [auth?.userProfile]
  );

  const ishigherMD = size.width && size.width > screenResolutions.md;
  const ishigherSM = size.width && size.width > screenResolutions.sm;

  useEffect(() => {
    design.getMintedCards();
  }, []);

  return (
    <div className='profileHome'>
      <div
        className={cn(
          'profileHome__info',
          // 'profileHome__info--half',
          !design.mintedCards?.length && ishigherSM && 'profileHome__info--big'
        )}
      >
        <ProfilePersonalCard
          className={cn(
            'profileHome__personal',
            !design.mintedCards?.length &&
              ishigherSM &&
              'profileHome__personal--half'
          )}
          home
        />

        {!ishigherMD && ishigherSM && (
          <>
            {!design.mintedCards?.length ? (
              <CryptoList
                className={cn(
                  'profileHome__crypto',
                  'profileHome__crypto--small'
                )}
                editText='Edit'
                showScrollable
                small
              />
            ) : (
              <ProfileChecklist className='profileHome__checklist' />
            )}
          </>
        )}
        {!ishigherSM && <ProfileChecklist className='profileHome__checklist' />}
        {(ishigherMD || !ishigherSM) && (
          <CryptoList className='profileHome__crypto' />
        )}
      </div>
      {/* {!ishigherMD && ishigherSM && (
        <div className='profileHome__cryptoContainer'>
          <CryptoList className='profileHome__crypto' />
        </div>
      )} */}
      <div className='profileHome__newsfeed'>
        <SingleNewsPlay />
        {/* {ishigherMD && <CryptoList className='profileHome__crypto' />} */}
        <Newsfeed />
      </div>
      {ishigherSM && (
        <div
          className={cn(
            'profileHome__sidebar',
            // 'profileHome__sidebar--half',
            !design.mintedCards?.length && 'profileHome__sidebar--big'
          )}
        >
          {/* {!allVerified ? ( */}
          {ishigherMD && (
            <ProfileChecklist className='profileHome__checklist' />
          )}
          {/* ) : ( */}
          {!!design.mintedCards?.length && (
            <ProfileEducation
              slidesPerView={ishigherMD ? 1.5 : 1.2}
              showPaginaton={false}
              className='profileHome__education'
              sliderClassName='profileHome__sliderEducation'
              centeredSlides
              showIconsSlider={false}
              spaceBetween={ishigherMD ? 32 : 16}
            />
          )}
          {!ishigherMD && ishigherSM && (
            <>
              {!design.mintedCards?.length ? (
                <ProfileChecklist
                  className={cn(
                    'profileHome__checklist',
                    'profileHome__checklist--half'
                  )}
                />
              ) : (
                <CryptoList
                  className={cn('profileHome__crypto')}
                  editText='Edit'
                  showScrollable
                />
              )}
            </>
          )}
          {/* )} */}
          {/* <ProfileWork
  slidesPerView={1.3}
  showBtn={false}
  showPaginaton={false}
  className='profileHome__education'
  sliderClassName='profileHome__sliderWork'
  centeredSlides
  // showIconsSlider={false}
  disabled
/> */}
          {/* <SidebarNews /> */}
        </div>
      )}
    </div>
  );
};
