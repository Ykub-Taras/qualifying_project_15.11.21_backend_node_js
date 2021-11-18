const {
} = require('../config');

const { User } = require('../dataBase');

const { passwordService: { hashPassword } } = require('../services');

module.exports = {

    createUserMiddleware: async (req, res, next) => {
        try {
            const {
                body: {
                    password
                },
            } = req;


            const hPassword = await hashPassword(password);

            const newUser = await User.create({
                ...req.body,
                password: hPassword
            });

            req.user = newUser;
            next();
        } catch (error) {
            next(error);
        }
    }
};
