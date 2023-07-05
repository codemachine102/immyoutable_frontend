import * as yup from 'yup';

export const verifyPhoneSchema = (countryMask) =>
  yup
    .object({
      phone: yup
        .string()
        .test(
          'len',
          'Invalid phone number',
          (val) => val?.length === countryMask?.replace('\\', '')?.length
        )
        .required(),
    })
    .required();
