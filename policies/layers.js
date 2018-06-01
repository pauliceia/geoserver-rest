import Joi from 'joi';

module.exports = {
    get: {
        params: {
            workspace: Joi.string().required(),
            datastore: Joi.string().required()
        }
    },
    publish: {
        body: {
            name: Joi.string().regex(/[a-zA-Z]/).required()
        }
    },
    remove: {
        params:{
            name: Joi.string().regex(/[a-zA-Z]/).required()
        }
    }
};