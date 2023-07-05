import * as yup from 'yup';

export const changeEmailSchema = yup
  .object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
  })
  .required();
