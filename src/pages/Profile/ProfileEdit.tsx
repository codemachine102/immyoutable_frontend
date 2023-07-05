import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//styles
import './styles.scss';
//components
import {
  Button,
  Input,
  ProfileAvatar,
  ProfileModal,
  ChangeEmailForm,
} from '../../components';
//constants
import { ROUTES } from '../../constants';
//validation
import { editProfileSchema } from '../../validation';
//context
import { useAuth } from '../../context';
//utils
import { showToastMessage } from '../../utils';
//types
import { UpdateProfileType } from '../../context/auth/types';

type FormData = {
  username?: string;
  bio?: string;
  files?: FileList;
};

export const ProfileEdit = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [openModalEmail, setOpenModalEmail] = useState<boolean>(false);
  const [emailUpdated, setEmailUpdated] = useState<boolean>(false);
  const [emailUpdateError, setEmailUpdateError] = useState<string>('');
  const [emailUpdateLoading, setEmailUpdateLoading] = useState<boolean>(false);
  const [imageUpdateLoading, setImageUpdateLoading] = useState<boolean>(false);
  const [imagelUpdateError, setImageUpdateError] = useState<string>('');
  const [userUpdateLoading, setUserUpdateLoading] = useState<boolean>(false);
  const [userUpdateError, setUserUpdateError] = useState<string>('');
  const [choosenImage, setChoosenImage] = useState<File | null>(null);
  const [choosenImageURL, setChoosenImageURL] = useState<string | null>(null);

  const goBack = () => {
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      username: auth.userProfile?.user?.nickname,
      bio: auth.userProfile?.student?.bio,
    },
    resolver: yupResolver(editProfileSchema),
  });

  const { ref, ...fields } = register('files');

  const watch = useWatch({
    control,
  });

  const updateUser = async ({ nickname, bio }: UpdateProfileType) => {
    // console.log('nickname, bio', { nickname, bio });

    setUserUpdateLoading(true);
    setUserUpdateError('');
    const res = await auth.updateProfile({ nickname, bio });
    // console.log('updateUser', res);
    if (res.err) {
      setUserUpdateError(res.data);
    }
    setUserUpdateLoading(false);
    return res;
  };

  const updateImage = async (image: File) => {
    setImageUpdateLoading(true);
    setImageUpdateError('');
    const res = await auth.updateProfileImage({ image });
    // console.log('updateImage', res);
    if (res.err) {
      setImageUpdateError(res.data);
    }
    setImageUpdateLoading(false);
    return res;
  };

  const onSubmit = useCallback(
    handleSubmit((data: FormData) => {
      // console.log('data', data);
      // if (data.file) console.log(data.file[0], Array.from(data.file));
      const promises = [];
      if (choosenImage) {
        // console.log('data files', data.files, data.files[0]);
        promises.push(updateImage(choosenImage));
      }
      const newUsername =
        data.username != null &&
        data.username !== auth.userProfile?.user?.nickname;
      const newBio =
        data.bio != null && data.bio !== auth.userProfile?.student?.bio;
      if (newUsername || newBio) {
        promises.push(
          updateUser({
            nickname: data?.username,
            bio: data?.bio,
          })
        );
      }
      // console.log('promises', promises);
      Promise.all(promises)
        .then(async (res) => {
          // console.log('promise all res', res);

          if (!!res.length && res.every((el) => el.err === false)) {
            showToastMessage({
              type: 'base',
              text: 'Profile updated',
            });
            setTimeout(() => {
              navigate(ROUTES.profile);
            }, 1300);
          }
          await auth.getUserFn();
          setValue('files', undefined);
        })
        .catch((err) => {
          // console.log('promise all err', err);
        });
    }),
    [choosenImage]
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  // const choosenImage = useMemo(
  //   () =>
  //     watch.files && watch.files[0]
  //       ? URL.createObjectURL(watch.files[0])
  //       : null,
  //   [watch.files]
  // );

  useEffect(() => {
    // console.log('watch.files', watch.files && watch.files[0]);
    if (watch.files && watch.files[0]) {
      setChoosenImageURL(URL.createObjectURL(watch.files[0]));
      setChoosenImage(watch.files[0]);
    }
  }, [watch.files]);

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.files);
  //   console.log('e.target', e.target.files, e.target.files?.length);
  //   if (e.target.files)
  //     console.log(e.target.files[0], Array.from(e.target.files));
  // };

  // console.log('errors', errors?.files);

  useEffect(() => {
    if (auth.userProfile?.user?.nickname) {
      setValue('username', auth.userProfile?.user.nickname);
    }
    if (auth.userProfile?.student?.bio) {
      setValue('bio', auth.userProfile?.student.bio);
    }
  }, [auth.userProfile]);

  const updateEmail = async (data: any) => {
    setEmailUpdateLoading(true);
    setEmailUpdateError('');
    // console.log('updateEmail', data);
    const res = await auth.emailChangeRequest(data.email);
    // console.log('updateEmail res', res);
    setEmailUpdateLoading(false);
    if (res.err) {
      setEmailUpdateError(res.data);
    } else {
      setEmailUpdated(true);
      // auth.getUserFn();
    }
  };

  return (
    <div className='profileEdit'>
      <h2 className='profile__title mb32'>Edit my profile</h2>
      <div className='profileEdit__container'>
        <div className='profileEdit__photo mb32'>
          <div className='profileEdit__photoContainer'>
            <ProfileAvatar choosenImage={choosenImageURL} />
            <Button
              buttonType='text'
              text={`${
                auth.userProfile?.user?.image || choosenImage
                  ? 'Change'
                  : 'Upload'
              } photo`}
              className='flex1'
              onClick={handleUploadClick}
            />
            <input
              type='file'
              // onChange={handleFileChange}
              style={{ display: 'none' }}
              // value={''}
              accept='image/png, image/jpeg'
              {...fields}
              ref={(instance) => {
                ref(instance); // RHF wants a reference to this input
                inputRef.current = instance; // We also need it to manipulate the elemnent
              }}
            />
          </div>
          {errors.files && (
            <p className='input__error mt8'>{errors.files.message}</p>
          )}
        </div>
        <div className='profileEdit__form'>
          <Input
            label='Username'
            className='form__input mb32'
            register={register('username')}
            value={watch.username}
            type='text'
            name='username'
            error={errors.username?.message || userUpdateError}
          />
          <Input
            label='Email'
            className='form__input mb32'
            value={auth.userProfile?.user?.email || ''}
            type='email'
            name='email'
            disabled
            rightElement={
              <Button
                buttonType='text'
                text='Change'
                onClick={() => setOpenModalEmail(true)}
              />
            }
          />
          <Input
            label='Bio'
            className='form__input mb32'
            register={register('bio')}
            value={watch.bio}
            type='textarea'
            name='bio'
            error={errors.bio?.message || userUpdateError}
            rows={5}
          />
          <div className='profileEdit__btns'>
            <Button
              buttonType='outline'
              text='Cancel'
              onClick={goBack}
              className='flex1'
            />
            <Button
              text='Save'
              onClick={onSubmit}
              className='flex1'
              loading={imageUpdateLoading || userUpdateLoading}
            />
          </div>
        </div>
      </div>

      <ToastContainer
        className='toast__container'
        bodyClassName='toast__body'
        hideProgressBar
        toastClassName='toast__item'
        closeButton={false}
      />
      <ProfileModal
        open={openModalEmail}
        handleClose={() => setOpenModalEmail(false)}
      >
        {!emailUpdated ? (
          <>
            <h2 className='auth__title mb32'>Change Email</h2>
            <ChangeEmailForm
              submit={updateEmail}
              loading={emailUpdateLoading}
              error={emailUpdateError}
            />
          </>
        ) : (
          <>
            <h2 className='auth__title mb16'>Email updated!</h2>
            <p className='auth__subtitle mb32'>
              {/* You have successfully updated your email */}
              Verification email has been sent
            </p>
            <div className='form__container'>
              <Button text='Ok' onClick={() => setOpenModalEmail(false)} />
            </div>
          </>
        )}
      </ProfileModal>
    </div>
  );
};
