import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { ProfileVerifyIdentity } from '../ProfileVerifyIdentity';
import { ProfileVerifyPhone } from '../ProfileVerifyPhone';
import { ProfileVerifyDegree } from '../ProfileVerifyDegree';
//context
import { useAuth } from '../../../context';

interface ProfileChecklistProps extends HTMLAttributes<HTMLDivElement> {}

export const ProfileChecklist: FC<ProfileChecklistProps> = ({ className }) => {
  const auth = useAuth();

  return (
    <div className={cn('profileChecklist', className)}>
      <h3>Verification checklist</h3>
      <ul className='profileChecklist__list'>
        <li>
          <ProfileVerifyIdentity
            isAproved={auth.userProfile?.user?.isIdentityVerified}
          />
        </li>
        <li>
          <ProfileVerifyDegree
            isAproved={auth.userProfile?.student?.isDegreeVerified}
          />
        </li>
        <li>
          <ProfileVerifyPhone
            isAproved={auth.userProfile?.user?.isPhoneVerified}
          />
        </li>
      </ul>
    </div>
  );
};
