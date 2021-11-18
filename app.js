const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');
const path = require('path');

require('dotenv')
    .config();

const {
    statusCodes: {
        FORBIDDEN,
        NOT_FOUND,
        SERVER_ERROR
    },
    statusMessages: {
        CORS_FORBIDDEN,
        NOT_FOUND_M
    },
    variables: {
        ALLOWED_ORIGINS,
        EXPRESS_STATIC,
        MONGODB_LINK,
        PORT,
    }
} = require('./config');
const {
    usersRouter
} = require('./routes');
const { ErrorHandler } = require('./errors');

const app = express();

mongoose.connect(MONGODB_LINK);

if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(cors({ origin: _configureCors }));

app.use(helmet());

app.use(expressRateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100
}));

app.use(express.static(path.join(__dirname, EXPRESS_STATIC)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

app.listen(PORT, () => console.log(`App listen ${PORT}`));
// console.log(process.env);

app.get('/ping', (req, res) => res.json('pong')); // test point

// option without rendering
app.use('/api/users', usersRouter);

app.use('*', _notFoundError);
app.use(_errorHandler);

// ---------- Error handlers ---------
function _notFoundError(error, req, res, next) {
    next({
        status: error.status || NOT_FOUND,
        message: error.message || NOT_FOUND_M

    });
}

// eslint-disable-next-line no-unused-vars
function _errorHandler(error, req, res, next) {
    res.status(error.status || SERVER_ERROR)
        .json({ message: error.message });
}

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(FORBIDDEN, CORS_FORBIDDEN), false);
    }

    return callback(null, true);
}
