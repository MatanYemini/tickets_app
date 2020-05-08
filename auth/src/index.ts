import express from 'express';
import { json } from 'body-parser';
import { authRouter } from './routes/auth';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json());

app.use('/api/users', authRouter);

// Add combined router
app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('running on port 3000!!');
});
