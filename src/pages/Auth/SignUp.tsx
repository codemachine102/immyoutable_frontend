import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//styles
import './styles.scss';
//components
import { Button, Checkbox, GoogleSignIn, Input } from '../../components';
//constants
import { ROUTES } from '../../constants';
//validation
import { signUpSchema } from '../../validation';
//utils
import { formatDateMDY, showToastMessage } from '../../utils';
//context
import { useAuth } from '../../context';

type FormData = {
  email: string;
  password: string;
  repeat_password: string;
  display_name: string;
  first_name: string;
  surname: string;
  dob: Date;
  phone: string;
  agree: boolean;
};

export const SignUp = () => {
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    // reset,
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  });

  const watch = useWatch({
    control,
  });

  const auth = useAuth();

  const submit = handleSubmit(async (data: FormData) => {
    // console.log(data);

    const formatedDate = formatDateMDY(data.dob, '-');

    const newData: any = {
      email: data.email,
      password: data.password,
      passwordConfirm: data.repeat_password,
      nickname: data.display_name,
      firstName: data.first_name,
      lastName: data.surname,
      birthdate: formatedDate,
      agreement: data.agree,
    };
    if (data.phone) {
      newData.phone = data.phone;
    }
    // console.log(newData);

    const res = await auth.signUp(newData);
    // console.log('signUp res', res);

    if (!res.err) {
      setSignedUp(true);
      // const res = await auth.emailVerificationRequest(data.email);
      // console.log('emailVerificationRequest res', res);
    } else {
      showToastMessage({
        type: 'error',
        text: res.data,
      });
    }
  });

  const onSubmit = () => {
    submit();
  };

  const goToLogin = () => {
    navigate(ROUTES.signIn);
  };

  // const resetSignUp = () => {
  //   reset();
  //   setSignedUp(false);
  // };

  return (
    <div className='auth'>
      {!signedUp ? (
        <>
          <h2 className='auth__title mb32'>Sign up</h2>
          <div className='auth__container'>
            <Input
              label='Email'
              className='auth__input'
              register={register('email')}
              value={watch.email}
              type='email'
              name='email'
              error={errors.email?.message}
              placeholder='name@gmail.com'
            />
            <Input
              label='Password'
              className='auth__input mt18'
              register={register('password')}
              value={watch.password}
              type='password'
              name='password'
              error={errors.password?.message}
              text='Must be at least 8 characters long including uppercase letters, 
          lowercase letters, numbers and characters'
            />
            <Input
              label='Repeat password'
              className='auth__input mt18'
              register={register('repeat_password')}
              value={watch.repeat_password}
              type='password'
              name='repeat_password'
              error={errors.repeat_password?.message}
            />
            <Input
              label='Display name'
              className='auth__input mt18'
              register={register('display_name')}
              value={watch.display_name}
              type='text'
              name='display_name'
              error={errors.display_name?.message}
            />

            <div className='auth__inputs mt18'>
              <Input
                label='Legal First name'
                className='auth__input auth__input--small'
                register={register('first_name')}
                value={watch.first_name}
                type='text'
                name='first_name'
                error={errors.first_name?.message}
              />
              <Input
                label='Legal Surname'
                className='auth__input auth__input--small'
                register={register('surname')}
                value={watch.surname}
                type='text'
                name='surname'
                error={errors.surname?.message}
              />
            </div>

            <div className='auth__inputs mt18'>
              {/* <Input
                label='Date of birth'
                className='auth__input'
                register={register('dob')}
                value={watch.dob}
                type='text'
                name='dob'
                error={errors.dob?.message}
              /> */}
              {/* <DatePicker
                className='auth__input auth__input--small'
                value={watch?.dob}
                setValue={(value) => setValue('dob', value)}
                error={errors.dob?.message}
              /> */}
              <Input
                label='Date of birth'
                className='auth__input auth__input--small'
                register={register('dob')}
                value={watch.dob?.toString()}
                type='text'
                name='dob'
                error={errors.dob?.message}
                mask={'99/99/9999'}
                placeholder='mm/dd/yyyy'
              />
              <Input
                label='Phone number'
                className='auth__input auth__input--small'
                register={register('phone')}
                value={watch.phone}
                type='text'
                name='phone'
                error={errors.phone?.message}
                mask={'(999) 999-9999'}
              />
            </div>

            <div className='auth__agree mt24 mb16'>
              <Checkbox
                checked={watch.agree}
                onChange={(e) => {
                  setValue('agree', e.target.checked);
                }}
              />
              <span className='auth__agreeText'>
                I agree to the <Link to={ROUTES.terms}>Terms of Service</Link>{' '}
                and <Link to={ROUTES.privacy}>Privacy Policy</Link>
              </span>
            </div>
            {errors.agree && (
              <p className='input__error mt8'>{errors.agree.message}</p>
            )}

            <Button
              text='Sign up'
              className='auth__btn mb16'
              color='blue'
              onClick={onSubmit}
              disabled={
                !watch.email ||
                !watch.password ||
                !watch.repeat_password ||
                !watch.display_name ||
                !watch.first_name ||
                !watch.surname ||
                !watch.dob ||
                !watch.agree
              }
            />
            <GoogleSignIn className='' text='signin_with' context='signin' />
            <div className='auth__text mt24'>
              <span>Already have an account?</span>
              <Button
                text='Log in'
                buttonType='text'
                className='align-baseline'
                onClick={goToLogin}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className='auth__title mb16'>you are signed up!</h2>
          <p className='auth__subtitle mb32'>
            Verification link was sent to your email
          </p>
          <div className='auth__container'>
            <Button
              text='OK'
              className='auth__btn'
              color='blue'
              onClick={goToLogin}
            />
          </div>
        </>
      )}
    </div>
  );
};
