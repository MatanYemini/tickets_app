import express from 'express';
import { json } from 'body-parser';
import { authRouter } from './routes/auth';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
// we will use ingress-nginx so our data will be proxied, so he can trust it (at default he will recognize proxy and wont enable it)
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // disable ecnryption (JWT is already encrypted)
    signed: false,
    // will be only in https connection
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use('/api/users', authRouter);

// Add combined router
app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
