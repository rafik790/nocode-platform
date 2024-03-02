import Application, { IApp } from "../models/appModel";
import { v4 as uuidv4 } from "uuid";
import { SYS_MESSAGE } from "../utils/constants";

export const createApplication = async (payload: any, loggedUserID: string): Promise<any> => {
    const appObj: IApp = {
        appID: uuidv4(),
        appName: payload.appName,
        appDesc: payload.appDesc,
        appDomain: payload.appDomain,
        isDeleted: false,
        deletedAt: null,
        userID: loggedUserID
    };

    const responseDto = {
        status: 'success',
        message: "",
        data: {
            appID: ""
        },
    };

    const appDoc = await Application.findOne({ appDomain: appObj.appDomain });
    if (!appDoc) {
        await Application.create(appObj);
        responseDto.status = SYS_MESSAGE.SUCCESS.CODE;
        responseDto.message = "Application created sucessfully";
        responseDto.data.appID = appObj.appID;
    } else {
        responseDto.status = SYS_MESSAGE.BAD_REQUEST.CODE;
        responseDto.message = "Application can't be create as domain is already exist";
        responseDto.data.appID = appObj.appID;
    }
    return responseDto;
}

export const getApplications = async (loggedUserID: string): Promise<any> => {

    const responseDto = {
        status: 'success',
        message: "",
        data: {

        }
    };

    const applications = await Application.find({ userID: loggedUserID }, { __v: 0 }).exec();
    responseDto.status = SYS_MESSAGE.SUCCESS.CODE;
    responseDto.message = SYS_MESSAGE.SUCCESS.MSG;
    responseDto.data = {
        dataList: applications
    };

    return responseDto;
}