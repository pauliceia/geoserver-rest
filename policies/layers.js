import Joi from 'joi';

module.exports = {
    get: {
        params: {
            workspace: Joi.string().regex(/[a-zA-Z]/).required(),
            datastore: Joi.string().regex(/[a-zA-Z]/).required()
        }
    },
    publish: {
        body: {
            workspace: Joi.string().regex(/[a-zA-Z]/).required(),
            datastore: Joi.string().regex(/[a-zA-Z]/).required(),
            layer: Joi.string().regex(/[a-zA-Z]/).required(),
            description: Joi.string().regex(/[a-zA-Z]/).required(),
            projection: Joi.string().regex(/[a-zA-Z]/).required()
        }
    },
    remove: {
        params:{
            workspace: Joi.string().regex(/[a-zA-Z]/).required(),
            datastore: Joi.string().regex(/[a-zA-Z]/).required(),
            layer: Joi.string().regex(/[a-zA-Z]/).required()
        }
    }
};