const {
    Schema,
    model
} = require('mongoose');

const {
    variables: { USERS },
    usersRoleENUM
} = require('../config');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false
        },
        userType: {
            type: String,
            default: usersRoleENUM.DRIVER,
            enum: Object.values(usersRoleENUM)
        }
    }, { timestamps: true }
);

module.exports = model(USERS, userSchema);
