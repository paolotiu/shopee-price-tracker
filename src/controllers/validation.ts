import Joi from 'joi';
export const signUpSchema = Joi.object<{
  username: string;
  password: string;
}>({
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
});
