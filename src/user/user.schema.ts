import * as Joi from 'joi';

export const registerSchema = {
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
};

export const loginSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
}
