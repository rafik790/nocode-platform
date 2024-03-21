import ContentModel from '../models/contentModel';
import { v4 as uuidv4 } from "uuid";
import { SYS_MESSAGE } from '../utils/constants';


export const getContentModels = async (appID: string, pageSize: number, skip: number, sort: any, searchQuery: any): Promise<any> => {

    const query = searchQuery
        ? { appID: appID, modelName: { $regex: searchQuery, $options: 'i' } }
        : { appID: appID };

    const total = await ContentModel.countDocuments(query);
    const responseDto = {
        status: 'success',
        message: "",
        data: {

        }
    };

    if (skip >= total && skip > 0) {
        responseDto.status = SYS_MESSAGE.BAD_REQUEST.CODE;
        responseDto.message = 'This page does not exist';
        return responseDto;
    }

    const applications = await ContentModel.find(query)
        .sort(sort?.toString())
        .skip(skip)
        .limit(pageSize)
        .exec();

    responseDto.status = SYS_MESSAGE.SUCCESS.CODE;
    responseDto.message = SYS_MESSAGE.SUCCESS.MSG;
    responseDto.data = {
        total: total,
        dataList: applications
    };

    return responseDto;
}

export const createContentModel = async (loggedUserID: string, appID: string, modelName: string, elements: Array<any>): Promise<any> => {

    const fields: Array<any> = [];
    elements.forEach((element: any) => {
        const field = {
            fieldID: element.fieldID,
            fieldName: element.fieldName,
            fieldType: element.fieldType
        }
        fields.push(field)
    });

    const result = await ContentModel.findOne({
        appID: appID,
        lowerCaseName: modelName.toLocaleLowerCase()
    }).lean();

    if (result) {
        const responseDto = {
            status: 'failed',
            message: "Model with same name already exist"
        };
        return responseDto;
    }


    const newModel = await ContentModel.create({
        modelName: modelName,
        lowerCaseName: modelName.toLocaleLowerCase(),
        fields: fields ?? [],
        appID: appID,
        userID: loggedUserID,
        isActive: true
    });

    const responseDto = {
        status: SYS_MESSAGE.SUCCESS.CODE,
        message: "",
        data: {
            modelID: newModel._id
        },
    };
    return responseDto;
}

export const addFieldsInContentModel = async (appID: string, modelID: string, elements: Array<any>): Promise<any> => {
    console.log("appID:", appID);
    console.log("modelID:", modelID);

    const modelExist = await ContentModel.findOne({
        appID: appID,
        _id: modelID
    }).lean();

    if (!modelExist) {
        const responseDto = {
            status: 'failed',
            message: "Model does not exist."
        };
        return responseDto;
    }

    let isFiedExist = false;
    for (let field of modelExist.fields) {
        const existingFields = elements.filter((element: any) => {
            return element.fieldID === field.fieldID
        });

        if (existingFields.length > 0) {
            isFiedExist = true;
            break;
        }
    }

    if (isFiedExist) {
        const returnDto = {
            status: 'failed',
            message: "Some fields are are already exist in the model."
        };
        return returnDto;
    }


    const fields: Array<any> = [];
    let isEntityFieldPresent: boolean = false;
    elements.forEach((element: any) => {
        const field = {
            fieldID: element.fieldID,
            fieldName: element.fieldName,
            fieldType: element.fieldType,
            isUniqueField: element.isUniqueField,
            isRequiredField: element.isRequiredField,
            isEntityField: element.isEntityField
        }

        if (element.isEntityField) {
            isEntityFieldPresent = true;
        }
        fields.push(field)
    });

    if (isEntityFieldPresent) {
        await ContentModel.updateOne(
            {
                _id: modelID,
                fields: {
                    $elemMatch: {
                        isEntityField: { $ne: true }
                    }
                }
            },
            { $set: { "fields.$.isEntityField": false } }
        );
    }

    const result = await ContentModel.updateOne(
        { _id: modelID },
        { $push: { fields: [...fields] } },
        { upsert: false }
    );

    const responseDto = {
        status: SYS_MESSAGE.SUCCESS.CODE,
        message: "Field(s) added sucessfully"
    };
    return responseDto;
}

export const getContentModelDetails = async (appID: string, modelID: string): Promise<any> => {
    const query = { appID: appID, _id: modelID }
    const contentModel = await ContentModel.findOne(query, {
        __v: 0
    }).exec();
    
    const responseDto = {
        status: SYS_MESSAGE.SUCCESS.CODE,
        message: SYS_MESSAGE.SUCCESS.MSG,
        data: contentModel
    };
    return responseDto;
}
