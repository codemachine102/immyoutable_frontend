import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';

//styles
import './styles.scss';
//components
import { Breadcrumbs, Button, Input, UploadInput } from '../../components';
//constants
import { socialMediaIcons } from '../../constants';
//assets
import { arrowBackIcon } from '../../assets/icons';
//context
import { useAuth, useCommon } from '../../context';

type FormData = {
  email: string;
  subject: string;
  message: string;
  files?: File[];
};

export const ContactUs = () => {
  // const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const common = useCommon();
  const auth = useAuth();

  const goBack = () => {
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    // trigger,
    reset,
  } = useForm<FormData>({
    // resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: '',
      subject: '',
      message: '',
      files: undefined,
    },
  });
  const watch = useWatch({
    control,
  });

  const submit = handleSubmit(async (data: FormData) => {
    // console.log('contactUs data', data);
    setError('');
    setLoading(true);
    const res = await common.contactUs(data);
    setLoading(false);
    // console.log('contactUs res', res);
    if (res.err) {
      setError(res.data);
    } else {
      reset({
        email: auth?.userProfile?.user?.email || '',
        subject: '',
        message: '',
        files: undefined,
      });
    }
  });
  const onSubmit = () => {
    submit();
  };

  useEffect(() => {
    if (!common.socialMedia || !common.socialMedia.length) {
      common.getSocialMedia();
    }
  }, [common]);

  useEffect(() => {
    if (auth.userProfile && auth.userProfile?.user?.email) {
      setValue('email', auth.userProfile?.user?.email);
    }
  }, [auth.userProfile]);

  return (
    <div className='general generalContact'>
      <Breadcrumbs title='Contact us' />
      <div className='general__header'>
        <img
          src={arrowBackIcon}
          className='general__headerArrow'
          onClick={goBack}
          alt='Back Button'
        />
        <h2 className='general__title'>Contact us</h2>
      </div>
      <ul className='generalContact__info'>
        <li>
          <h4 className='generalContact__infoTitle'>Contact us</h4>
          <p className='generalContact__infoText'>support@immyoutable.com</p>
        </li>
        <li>
          <h4 className='generalContact__infoTitle'>Phone number</h4>
          <p className='generalContact__infoText'>336-300-6787</p>
        </li>
        {/* <li>
          <h4 className='generalContact__infoTitle'>Address</h4>
          <p className='generalContact__infoText'>
            41 Gower Street, St Georges, TF2 9BL
          </p>
        </li> */}
        <li className='generalContact__infoIcons'>
          {common.socialMedia?.map((social, index) => (
            <a
              href={social.link}
              key={`${social.id}-${index}`}
              target='_blank'
              rel='noreferrer'
            >
              <img src={socialMediaIcons[social.name]} alt={social.name} />
            </a>
          ))}
          {/* <a href='/'>
            <img src={homeTwitterIcon} alt='twitter' />
          </a>
          <a href='/'>
            <img src={homeInstagramIcon} alt='instagram' />
          </a>
          <a href='/'>
            <img src={homeFacebookIcon} alt='facebook' />
          </a> */}
        </li>
      </ul>
      <div className='generalContact__form'>
        <h3 className='generalContact__formTitle'>Contact form</h3>
        <div className='generalContact__formContainer'>
          <Input
            label='Email'
            className=''
            register={register('email')}
            value={watch.email}
            type='email'
            name='email'
            error={errors.email?.message}
            placeholder='name@gmail.com'
          />
          <Input
            label='Subject'
            className=''
            register={register('subject')}
            value={watch.subject}
            type='text'
            name='subject'
            error={errors.subject?.message}
          />
          <Input
            label='Questions'
            className=''
            register={register('message')}
            value={watch.message}
            type='textarea'
            name='message'
            error={errors.message?.message}
            rows={3}
          />
          <UploadInput
            files={watch.files}
            setFiles={(files: any) => setValue('files', files)}
            register={register('files')}
          />
          {error && <p className='generalContact__formError'>{error}</p>}
          <Button
            text='Submit'
            className='generalContact__formButton'
            color='blue'
            onClick={onSubmit}
            disabled={!watch.email || !watch.subject || !watch.message}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
