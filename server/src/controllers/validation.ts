import Joi from 'joi';
export const signUpSchema = Joi.object<{
  email: string;
  password: string;
  callbackUrl: string;
}>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  callbackUrl: Joi.string().required(),
});
