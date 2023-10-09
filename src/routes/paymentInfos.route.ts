import { Router } from 'express';
import { createPaymentInfosController } from '../controllers/paymentInfos.controller';

export const paymentInfoRoutes: Router = Router();

paymentInfoRoutes.post(
  '/:clientId',
  createPaymentInfosController
);
