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
    secure: true,
  })
);

app.use('/api/users', authRouter);

// Add combined router
app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log('running on port 3000!!');
  });
};

start();
