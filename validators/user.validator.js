const Joi = require('joi');

const {
    EMAIL_REGEXP,
    PASSWORD_REGEXP
} = require('../config/const.validators');

const { usersRoleENUM } = require('../config');

const emailSchema = Joi.string()
    .regex(EMAIL_REGEXP)
    .trim()
    .required();
const passwordSchema = Joi.string()
    .regex(PASSWORD_REGEXP)
    .trim()
    .required();

const createUserValidator = Joi.object({

    userName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: emailSchema,
    password: passwordSchema,
    userType: Joi.string()
        .allow(...Object.values(usersRoleENUM))

});

const updateUserValidator = Joi.object({

    userName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    email: emailSchema,
    password: passwordSchema,
    userType: Joi.string()
        .allow(...Object.values(usersRoleENUM))

});

module.exports = {
    createUserValidator,
    updateUserValidator
};
