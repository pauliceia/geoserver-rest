import Joi from 'joi';
import passport from 'passport';

/*
 * verifies that the request has a valid token
 */
function authentication(req, res, next) {
    passport.authenticate('jwt', (err, user) => {
        if (err) 
            res.status(403).send({
                error: 'You do not have permission'
            })
        else next()
        
    })(req, res, next)
}

module.exports = {
    authentication
};

