import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

//styles
import './styles.scss';
//components
import { ProfileModal } from '../ProfileModal';
import { ProfileVerifyButton } from '../ProfileVerifyButton';
import { ProfileMeasureOne } from '../ProfileMeasureOne';
import { Button } from '../../Button';
//context
import { useAuth } from '../../../context';

interface ProfileVerifyDegreeProps extends HTMLAttributes<HTMLDivElement> {
  isAproved?: boolean;
}

export const ProfileVerifyDegree: FC<ProfileVerifyDegreeProps> = ({
  isAproved = false,
}) => {
  const auth = useAuth();
  const [openModalDegree, setOpenModalDegree] = useState<boolean>(false);
  const [openModalWaiting, setOpenModalWaiting] = useState<boolean>(false);
  const [complVerif, setComplVerif] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setOpenModalDegree(false);
    auth.getUserFn();
    if (complVerif) {
      setOpenModalWaiting(true);
    }
  }, [complVerif]);

  const openModal = useCallback(() => {
    if (!auth.userProfile?.student?.isVerifiedPending) {
      setOpenModalDegree(true);
    } else {
      setOpenModalWaiting(true);
    }
  }, [auth.userProfile]);

  return (
    <div className='profileVerifyDegree'>
      <ProfileVerifyButton
        text='Degree'
        onClick={openModal}
        isAproved={isAproved}
      />
      <ProfileModal
        open={openModalDegree}
        handleClose={closeModal}
        modalClassName='profileVerifyDegree__modal'
      >
        <h2 className='auth__title mb32'>Verify degree</h2>
        <ProfileMeasureOne setComplVerif={setComplVerif} />
      </ProfileModal>
      <ProfileModal
        open={openModalWaiting}
        handleClose={() => setOpenModalWaiting(false)}
        modalClassName='profileVerifyDegree__modal'
      >
        <p className='auth__subtitle profileVerifyDegree__modalText'>
          It might take a few minutes to reflect this update on the web site
        </p>
        <Button
          text='OK'
          onClick={() => setOpenModalWaiting(false)}
          className='designMint__mintBtn mt32 mb32'
        />
      </ProfileModal>
    </div>
  );
};
