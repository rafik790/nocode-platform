import * as pjtw from 'passport-jwt';
import User from "../models/userModel";
import dotenv from 'dotenv';
dotenv.config();

const JWT_ACCESS_TOKEN_KEY: string = process.env.JWT_ACCESS_TOKEN_KEY as string;
const opts: pjtw.StrategyOptions = {
    jwtFromRequest: pjtw.ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    secretOrKey: JWT_ACCESS_TOKEN_KEY,
    passReqToCallback: true
};

export const strategy = new pjtw.Strategy(opts, async (req: any, jwt_Payload: any, done: any) => {
    try {
        const user = await User.findOne({ _id: jwt_Payload.userID }).lean();
        if (user) {
            req["clientID"] = jwt_Payload.clientID;
            done(null, user);
        } else {
            return done("", false);
        }
    } catch (err: any) {
        return done(err, false);
    }

});