import * as yup from 'yup';

const fiels = {
  password: yup
    .string()
    .min(8)
    .max(128)
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-=~_!?.,$%+])[-=~_!?.,$%+A-Za-z\d]{8,}$/gm,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
  confirm_password: yup
    .string()
    .min(8)
    .max(128)
    .required()
    .oneOf([yup.ref('password'), null], "Password doesn't match")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-=~_!?.,$%+])[-=~_!?.,$%+A-Za-z\d]{8,}$/gm,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
};

export const changePasswordSchema = (isOld) => {
  if (isOld) {
    return yup
      .object({
        old_password: yup
          .string()
          .min(8)
          .max(128)
          .required()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-=~_!?.,$%+])[-=~_!?.,$%+A-Za-z\d]{8,}$/gm,
            'Password must contain at least 8 characters, one uppercase, one number and one special case character'
          ),
        ...fiels,
      })
      .required();
  } else {
    return yup
      .object({
        ...fiels,
      })
      .required();
  }
};
