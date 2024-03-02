import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

import {formRouter} from './routes/formRoutes';
import { userRouter } from './routes/userRoutes';
import {appRouter} from './routes/appRoutes';

import * as StartUp from './services/startup.service'
import passport from 'passport';
import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/errorController';

import { allowedOrigins } from './utils/constants';
import credentials from './middleware/credentials.middleware.';
import logger from './middleware/logger.middleware';
import * as auth from './middleware/passport.middleware';

const app: Application = express();

// Set security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(logger);

app.use(credentials);
app.use(cors({ origin: allowedOrigins }));

passport.use(auth.strategy);
app.use(passport.initialize());

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use(hpp());

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.get('/start-up', async(req, res) => {
  await StartUp.createAdminUser();
  res.json({'message': 'ok'});
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/forms', formRouter);
app.use('/api/v1/apps', appRouter);
app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
