import * as yup from 'yup';

export const signInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .max(128)
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-=~_!?.,$%+])[-=~_!?.,$%+A-Za-z\d]{8,}$/gm,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character'
      ),
  })
  .required();
