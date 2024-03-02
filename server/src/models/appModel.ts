import { type Query, Schema, model } from 'mongoose';
export interface IApp {
    appID: string;
    appName: string;
    appDesc: string;
    appDomain: string;
    userID: string;
    isDeleted: boolean;
    deletedAt: Date | null;
}
export interface IAppDocument extends IApp, Document {
}

const appSchema = new Schema<IAppDocument>(
    {
        appID: {
            type: String,
            required: true,
            unique: true
        },
        appName: {
            type: String,
            required: true,
        },
        appDesc: {
            type: String,
            required: true,
        },
        appDomain: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false,
            select: false,
        },
        deletedAt: {
            type: Date,
            default: null,
            select: false,
        },
    },
    { timestamps: true },
);
export default model<IAppDocument>('Application', appSchema);
