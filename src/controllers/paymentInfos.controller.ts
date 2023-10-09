import { Request, Response } from 'express';
import {
  TPaymentInfo,
  TPaymentInfoCreate,
} from '../interfaces/paymentInfos.interface';
import { createPaymentInfosService } from '../services/paymentInfos.service';

export const createPaymentInfosController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TPaymentInfoCreate = {
    ...req.body,
    client_id: req.params.clientId,
  };

  const paymentInfo: TPaymentInfo =
    await createPaymentInfosService(data);

  return res.status(201).json(paymentInfo);
};
