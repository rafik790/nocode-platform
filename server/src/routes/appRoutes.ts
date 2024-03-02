import express from 'express';
import passport from 'passport';
import * as AppController from '../controllers/appController';

export const appRouter = express.Router({ mergeParams: true });
appRouter.route("/").post(
    [passport.authenticate("jwt", { session: false })],
    AppController.createApplication
);

appRouter.route("/my-apps").get(
    [passport.authenticate("jwt", { session: false })],
    AppController.getMyApplications
);

appRouter.route("/:appID/create-model").post(
    [passport.authenticate("jwt", { session: false })],
    AppController.createContentModel
);

appRouter.route("/:appID/models").get(
    [passport.authenticate("jwt", { session: false })],
    AppController.getContentModels
);

appRouter.route("/:appID/models/:modelID").post(
    [passport.authenticate("jwt", { session: false })],
    AppController.addFieldsInContentModel
);
appRouter.route("/:appID/models/:modelID").get(
    [passport.authenticate("jwt", { session: false })],
    AppController.getContentModelDetails
);
