import express from 'express';
import passport from 'passport';
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
  .get([passport.authenticate("jwt", { session: false })], getAllForms)
  .post([passport.authenticate("jwt", { session: false })], createForm);

formRouter.route('/bulk-delete')
  .patch([passport.authenticate("jwt", { session: false })], deleteForms);

formRouter.route('/:id')
  .get([passport.authenticate("jwt", { session: false })], getForm)
  .patch([passport.authenticate("jwt", { session: false })], updateForm)
  .delete([passport.authenticate("jwt", { session: false })], deleteForm);

formRouter.route('/:id/responses')
  .get([passport.authenticate("jwt", { session: false })], getAllResponses)
  .post(createResponse);

export default formRouter;
