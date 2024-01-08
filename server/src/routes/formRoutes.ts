import { Router } from 'express';
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

const router = Router();

router.route('/')
  .get(getAllForms)
  .post(createForm);

router.patch('/bulk-delete', deleteForms);

router.route('/:id')
  .get(getForm)
  .patch(updateForm)
  .delete(deleteForm);

router.route('/:id/responses')
  .get(getAllResponses)
  .post(createResponse);

export default router;
