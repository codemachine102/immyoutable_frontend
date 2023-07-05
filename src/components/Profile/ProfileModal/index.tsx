import React, { FC, HTMLAttributes } from 'react';
import { Modal } from 'react-responsive-modal';
import cn from 'classnames';

//styles
import 'react-responsive-modal/styles.css';
import './styles.scss';
//assets
import { closeIcon } from '../../../assets/icons';

interface ProfileModalProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  handleClose?: () => void;
  modalClassName?: string;
}

export const ProfileModal: FC<ProfileModalProps> = ({
  open = false,
  handleClose = () => {},
  children,
  modalClassName,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeOnOverlayClick={true}
      center
      classNames={{
        overlay: 'profileModal__overlay',
        modalContainer: 'profileModal__modalContainer',
        modal: cn('profileModal__modal', modalClassName),
        closeButton: 'profileModal__closeButton',
      }}
      closeIcon={<img src={closeIcon} alt='Close' />}
    >
      <div className='profileModal__content'>{children}</div>
    </Modal>
  );
};
