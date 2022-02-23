import * as Joi from 'joi';
export const EnvValidationSchema = Joi.object({
  DB_USER: Joi.string().alphanum().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_SECRET: Joi.string().required(),
  REDIS_AUTH_COOKIE_NAME: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  APP_FRONTEND_URL: Joi.string().required(),
  APP_MAX_DOCUMENT_FILE_SIZE: Joi.number().required(),
  APP_SENDGRID_API_KEY: Joi.string().required(),
  APP_SENDGRID_NOREPLY_EMAIL: Joi.string().email().required(),
  APP_SENDGRID_SUPPORT_EMAIL: Joi.string().email().required(),
  APP_AWS_KEY_ID: Joi.string().required(),
  APP_AWS_SECRET: Joi.string().required(),
  APP_AWS_BUCKET_NAME: Joi.string().required(),
  APP_SUPERADMIN_PASSWORD: Joi.string().required(),
  JWT_NOSIS_KEY: Joi.string().required(),
}).error((e) => {
  return new Error(e.toString());
});
