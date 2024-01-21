import User, { IUser } from "../models/userModel";
import { v4 as uuidv4 } from "uuid";
export const createAdminUser = async (): Promise<any> => {
    const user: IUser = {
        userID: uuidv4(),
        firstName: 'Rafik',
        lastName: 'Mondal',
        email: 'rafikm@lowcode.com',
        password: '12345678aA',
        avatar: null,
        refreshToken: [],
        isDeleted: false,
        deletedAt: null,

    };


    const userDoc = await User.findOne({ email: user.email });
    if (!userDoc) {
        await User.create(user);
    } 

    const resposeDto = {
        status: 'success',
        data: {
            userID: user.userID
        },
    };

    return resposeDto;
}