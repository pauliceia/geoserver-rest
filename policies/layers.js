import Joi from 'joi';

module.exports = {
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