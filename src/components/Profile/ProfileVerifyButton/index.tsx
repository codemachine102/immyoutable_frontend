import React, { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { Button } from '../../Button';
//assets
import { verifyAprovedIcon, verifyNotAprovedIcon } from '../../../assets/icons';

interface ProfileVerifyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isAproved?: boolean;
  text?: string;
}

export const ProfileVerifyButton: FC<ProfileVerifyButtonProps> = ({
  isAproved = false,
  onClick = () => {},
  text = '',
}) => {
  return (
    <div className='profileVerifyButton'>
      <Button
        text={
          <div className='align-center'>
            <img
              src={isAproved ? verifyAprovedIcon : verifyNotAprovedIcon}
              className='mr4'
              alt='Verify Icon'
            />
            <span>
              {isAproved ? `${text}\xA0verified` : `Verify\xA0${text}`}
            </span>
          </div>
        }
        onClick={onClick}
        buttonType='text'
        disabled={isAproved}
        className={cn(isAproved && 'profileVerifyButton--aproved')}
      />
    </div>
  );
};
