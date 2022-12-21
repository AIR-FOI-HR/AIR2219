import { AppDataSource } from './db/entrypoint/data-source';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './model/constants/AppError';
const userRoutes = require('./controller/user.controller');
const paymentRoutes = require('./controller/payment.controller');
const restroomRoutes = require('./controller/restroom.controller');
const cityRoutes = require('./controller/city.controller');
const orderRoutes = require('./controller/order.controller');

const main = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/api/users', userRoutes);
  app.use('/api/restrooms', restroomRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/cities', cityRoutes);
  app.use('/api/orders', orderRoutes);

  //Reached only when no other middleware gives a response. Basically, for handling unsupported routes
  app.use((_, __, next) => {
    return next(new AppError('Unsupported route', 404));
  });

  app.use((error: AppError, _: Request, res: Response, next: NextFunction) => {
    //This will execute if any of the preceding middleware yields an error
    if (res.headersSent) {
      return next(error);
    }

    res.status(error.code || 500);
    res.json({
      error: error.message || 'Unknown error occurred!',
      timestamp: new Date().toISOString(),
    });
  });

  app.listen(parseInt(process.env.API_PORT!) || 8000);
};

AppDataSource.initialize()
  .then((conn) => conn.runMigrations())
  .then(() => console.log('Successfully connected to the database!'))
  .then(main)
  .catch((error) =>
    console.log('An error occurred while connecting to the database!', error)
  );
