const {
    User,
} = require('../dataBase');

const {

    statusCodes: {
        ACCEPTED,
        CREATED,
        NO_CONTENT,
    },
    statusMessages: {
        USER_DELETED
    }
} = require('../config');

const { userNormalizer } = require('../utils');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            const normalizedUser = userNormalizer(user);

            res.json(normalizedUser);
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req, res, next) => {
        try {
            let {
                user
            } = req;

            const newUser = userNormalizer(user);

            res.status(CREATED)
                .json(newUser);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                params: { id }
            } = req;
            let { body } = req;


            const updatedUser = await User.findByIdAndUpdate(
                id,
                { $set: body },
                { new: true }
            );

            const normalizedUser = userNormalizer(updatedUser);

            res.status(ACCEPTED)
                .json(normalizedUser);
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {
                params: { id },
            } = req;

            await User.deleteOne({ _id: id });

            res.status(NO_CONTENT)
                .json(USER_DELETED);
        } catch (error) {
            next(error);
        }
    }
};
