import * as yup from 'yup';

const MAX_FILE_SIZE = 2000000; //2MB

export const editProfileSchema = yup
  .object({
    username: yup.string().max(20),
    // .matches(/.{8,}/, {
    //   excludeEmptyString: true,
    //   message: 'Username must be at least 8 characters',
    // })
    bio: yup.string().max(400),
    files: yup
      .mixed()
      .test('is-valid-size', 'Max allowed size is 2MB', (value) => {
        // console.log('value.size', value[0]?.size);
        return value && value[0] ? value[0].size <= MAX_FILE_SIZE : true;
      }),
  })
  .required();
