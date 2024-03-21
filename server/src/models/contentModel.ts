import { type ObjectId, Schema, model, Types } from 'mongoose';

interface IContentModelField {
  fieldID: string;
  fieldName: string;
  fieldType: string;
  isUniqueField: boolean;
  isRequiredField: boolean;
  isEntityField: boolean;
}

interface IContentModel {
  modelName: string;
  lowerCaseName: string;
  fields: IContentModelField[];
  isActive: boolean;
  userID: Types.ObjectId;
  appID: Types.ObjectId;
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
  },
  isEntityField: {
    type: Boolean
  }
}, { _id: false });

export interface IContentModelDocument extends IContentModel, Document {
}
const contentModelSchema = new Schema<IContentModelDocument>(
  {
    modelName: {
      type: String,
      required: true,
    },
    lowerCaseName: {
      type: String,
      required: true
    },
    appID: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    },
    fields: [modelFieldsSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  },
);

export default model<IContentModelDocument>('ContentModel', contentModelSchema);
