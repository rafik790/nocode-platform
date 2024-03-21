import { Request, Response } from 'express';
import User from "../models/userModel";
import { v4 as uuidv4 } from "uuid";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("email::", email, " password::", password);

    const userDoc = await User.findOne({ email: email });
    if (!userDoc) {
        return res.status(400).json({
            status: 'failed',
            message: 'Credential is not valid.'
        });
    }

    if (userDoc.password !== password) {
        return res.status(400).json({
            status: 'failed',
            message: 'Credential is not valid.'
        });
    }
 
    const clientID = uuidv4();
    const accessToken = userDoc.generateJWTAcessToken(clientID);

    return res.status(200).json({
        status: 'success',
        message: 'success',
        data: {
            accessToken: accessToken,
            id: userDoc._id,
            name: userDoc.firstName+" "+userDoc.lastName,
            email: userDoc.email,
            avatar: userDoc.avatar
        },
    });
}