import express from 'express';
export const formRouter = express.Router({ mergeParams: true });

import {
  createForm,
  deleteForm,
  deleteForms,
  getAllForms,
  getForm,
  updateForm,
} from '../controllers/formController';

import {
  createResponse,
  getAllResponses,
} from '../controllers/formResponseController';

formRouter.route('/')
  .get(getAllForms)
  .post(createForm);

formRouter.patch('/bulk-delete', deleteForms);

formRouter.route('/:id')
  .get(getForm)
  .patch(updateForm)
  .delete(deleteForm);

formRouter.route('/:id/responses')
  .get(getAllResponses)
  .post(createResponse);

export default formRouter;
