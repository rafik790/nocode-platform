import { Request, Response } from 'express';
import * as appService from './../services/application.service';
import * as contentService from './../services/content.service';

import { SYS_MESSAGE } from "../utils/constants";
export const createApplication = async (req: any, res: Response) => {
    const loggedUserID = req.user.userID;
    const returnDto = await appService.createApplication(req.body, loggedUserID);
    if (returnDto.status != SYS_MESSAGE.SUCCESS.CODE) {
        return res.status(400).json(returnDto);
    } else {
        return res.status(201).json(returnDto);
    }
}
export const getMyApplications = async (req: any, res: Response) => {
    const loggedUserID = req.user.userID;
    const returnDto = await appService.getApplications(loggedUserID);
    if (returnDto.status != SYS_MESSAGE.SUCCESS.CODE) {
        return res.status(400).json(returnDto);
    } else {
        return res.status(201).json(returnDto);
    }
}

export const getContentModels = async (req: any, res: Response) => {
    const appID = req.params.appID;
    const page = Number(req.query.page) || 0;
    const pageSize = Number(req.query.pageSize) || 10;
    const skip = page * pageSize;
    const searchQuery = req.query.search;
    const sort = req.query.sort;
    

    const returnDto = await contentService.getContentModels(appID, pageSize, skip, sort, searchQuery);
    if (returnDto.status != SYS_MESSAGE.SUCCESS.CODE) {
        return res.status(400).json(returnDto);
    } else {
        return res.status(200).json(returnDto);
    }
}

export const createContentModel = async (req: any, res: Response) => {
    const appID = req.params.appID;
    const loggedUserID = req.user.userID;
    const { modelName, fields } = req.body;

    const returnDto = await contentService.createContentModel(loggedUserID, appID, modelName, fields);
    if (returnDto.status != SYS_MESSAGE.SUCCESS.CODE) {
        return res.status(400).json(returnDto);
    } else {
        return res.status(201).json(returnDto);
    }
}

export const addFieldsInContentModel = async (req: any, res: Response) => {
    const appID = req.params.appID;
    const modelID = req.params.modelID;

    const loggedUserID = req.user.userID;
    const { fields } = req.body;

    const returnDto = await contentService.addFieldsInContentModel(appID, modelID, fields);
    if (returnDto.status != SYS_MESSAGE.SUCCESS.CODE) {
        return res.status(400).json(returnDto);
    } else {
        return res.status(201).json(returnDto);
    }
}

export const getContentModelDetails = async (req: any, res: Response) => {
    const appID = req.params.appID;
    const modelID = req.params.modelID;
    const returnDto = await contentService.getContentModelDetails(appID, modelID);
    if (returnDto.status != SYS_MESSAGE.SUCCESS.CODE) {
        return res.status(400).json(returnDto);
    } else {
        return res.status(200).json(returnDto);
    }
}