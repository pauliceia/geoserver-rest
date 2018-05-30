import passport from 'passport'
import {Strategy, ExtractJwt} from 'passport-jwt'

module.exports = (app, environment) => {

    let params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: environment.authentication.jwtSecret
    }

    const strategy = new Strategy(params, (jwtPayload, done) => {
        if (jwtPayload != null)
            done(null, {});
        else
            done("not authorized", null);
    });
    
    passport.use(strategy);
    app.use(passport.initialize());
}