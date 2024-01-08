import { type ObjectId, Schema, model } from 'mongoose';
//import type { FormElementsType } from '@form-builder/validation/types';

interface IForm {
  name: string;
  elements: [];
  isActive: boolean;
  userID: ObjectId;
}

const formSchema = new Schema<IForm>(
  {
    name: {
      type: String,
      required: true,
    },
    elements: Array,
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

export default model<IForm>('Form', formSchema);
