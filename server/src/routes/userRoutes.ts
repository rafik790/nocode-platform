import express from 'express';
import * as UserController from '../controllers/userController';

export const userRouter = express.Router({ mergeParams: true });
userRouter.route("/login").post(UserController.login);



