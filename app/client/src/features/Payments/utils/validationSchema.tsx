import * as yup from 'yup';

const validationSchema = yup.object({
  amount: yup.string().default('').required(),
});

export { validationSchema };
