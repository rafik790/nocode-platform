import { type Query, Schema, model, Types } from 'mongoose';
export interface IApp {
    appName: string;
    appDesc: string;
    appDomain: string;
    userID: Types.ObjectId;
    isDeleted: boolean;
    deletedAt: Date | null;
}
export interface IAppDocument extends IApp, Document {
}

const appSchema = new Schema<IAppDocument>(
    {
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
            type: Schema.Types.ObjectId,
            ref: 'User',
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
