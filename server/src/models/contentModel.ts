import { type ObjectId, Schema, model } from 'mongoose';
//import type { FormElementsType } from '@form-builder/validation/types';


interface IContentModelField {
  fieldID: string;
  fieldName: string;
  fieldType: string;
  isUniqueField: boolean;
  isRequiredField: boolean;
}

interface IContentModel {
  modelID: string;
  modelName: string;
  lowerCaseName: string;
  fields: IContentModelField[];
  isActive: boolean;
  userID: string;
  appID: string;
}

const modelFieldsSchema = new Schema<IContentModelField>({
  fieldID: { type: String },
  fieldName: { type: String },
  fieldType: {
    type: String,
    enum: ["RichText", "Text", "Number", "DateTime", "Boolean", "ReferenceType"]
  },
  isUniqueField: {
    type: Boolean
  },
  isRequiredField: {
    type: Boolean
  }
}, { _id: false });

const contentModelSchema = new Schema<IContentModel>(
  {
    modelID: {
      type: String,
      required: true,
      unique: true
    },
    modelName: {
      type: String,
      required: true,
    },
    lowerCaseName: {
      type: String,
      required: true
    },
    appID: {
      type: String,
      required: true,
      default: null
    },
    fields: [modelFieldsSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IContentModel>('ContentModel', contentModelSchema);
