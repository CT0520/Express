import { Strategy, ExtractJwt } from 'passport-jwt';

export const jwtStrategy = new Strategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "This is my secret key"
}, (payload, done) => {
    if (payload.name) {
        return done(null, payload.name)
    }

    done(null, false)
})