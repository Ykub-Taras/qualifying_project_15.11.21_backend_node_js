 const router = require('express')
    .Router();

const {
    usersController
    } = require('../controllers');

const {
    variables: {
        VAR_BODY,
        VAR_EMAIL,
        VAR_ID,
        VAR_ID_DB_FIELD,
        VAR_PARAMS
    }

} = require('../config');

const {

    dynamicMiddleware: {
        checkDataForInsertingInDB_byDynamicParam,
        getDataByDynamicParam
    },
    userMiddleware: {
        createUserMiddleware,
        },
} = require('../middlewares');

const {
    userValidator: {
        createUserValidator,
        updateUserValidator
    }
} = require('../validators');

router.get('/',
    usersController.getAllUsers);
router.post('/',
    checkDataForInsertingInDB_byDynamicParam(createUserValidator),
    getDataByDynamicParam(VAR_EMAIL, VAR_BODY, VAR_EMAIL, true, true),
    createUserMiddleware,
    usersController.createUser);

router.get('/:id',
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    usersController.getUserById);
router.patch('/:id',
    checkDataForInsertingInDB_byDynamicParam(updateUserValidator),
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    usersController.updateUser);
router.delete('/:id',
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    usersController.deleteUser);

module.exports = router;
