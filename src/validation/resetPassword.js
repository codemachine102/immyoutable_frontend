import * as yup from 'yup';

export const resetPasswordSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();
