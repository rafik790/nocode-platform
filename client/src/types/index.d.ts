import { FormElementsType } from '@form-builder/validation/types';

export interface PaginatedResponseType {
  total: number;
}

export type FormType = {
  _id: string;
  isActive: boolean;
  name: string;
  elements: FormElementsType[];
  user: string;
  createdAt: string;
  updatedAt: string;
};


export type ContentModelFieldType = {
  fieldID: string;
  fieldName: string;
  fieldType: string;
};

export type ContentModelType = {
  _id: string;
  modelName: string;
  appID: string;
  isActive: boolean;
  userID: string;
  fields: ContentModelFieldType[];
  createdAt: string;
  updatedAt: string;
  isEntityFieldAdded: boolean
};

