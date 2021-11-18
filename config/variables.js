module.exports = {
    // APP variables:
    MONGODB_LINK: process.env.MONGODB_LINK || 'mongodb://localhost:27017/qualifyingProject_15_11_21',
    PORT: process.env.PORT || 5000,

    EXPRESS_STATIC: 'static',

    // MODEL variables / DataBase table ENUM:

    USERS: 'users',

    // ARGUMENTS for functions
    VAR_BODY: 'body',
    VAR_EMAIL: 'email',
    VAR_ID: 'id',
    VAR_ID_DB_FIELD: '_id',
    VAR_PARAMS: 'params',

    // CORS config
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000',

};

