import * as yup from 'yup';

export const signUpSchema = yup
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
    repeat_password: yup
      .string()
      .min(8)
      .max(128)
      .required()
      .oneOf([yup.ref('password'), null], "Password doesn't match")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-=~_!?.,$%+])[-=~_!?.,$%+A-Za-z\d]{8,}$/gm,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character'
      ),
    display_name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .max(20)
      .required(),
    first_name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .max(20)
      .required(),
    surname: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .min(2)
      .max(20)
      .required(),
    dob: yup
      .date()
      .required('Date of birth is required')
      .min(new Date(1900, 0), 'Date earlier than 1900 is not allowed')
      .max(new Date(), 'Future date not allowed')
      .typeError('Invalid date'),
    // dob: yup.date().required().typeError('Must be a date'),
    phone: yup
      .string()
      .test(
        'len',
        'Invalid phone number',
        (val) => val.length === 14 || val.length === 0
      ),
    agree: yup.boolean().isTrue('Agree is required'),
  })
  .required();
