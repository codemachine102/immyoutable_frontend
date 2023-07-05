import * as yup from 'yup';

export const verifyIdentitySchema = yup
  .object({
    type: yup.string().required(),
    number: yup.string().min(10).required(),
  })
  .required();
