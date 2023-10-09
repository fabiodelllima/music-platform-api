import { NextFunction, Request, Response } from 'express';
import {
  TClient,
  TClientResult,
} from '../interfaces/clients.interface';
import { client } from '../database';
import AppError from '../errors/App.error';

export const verifyClientId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { clientId } = req.params;

  const queryResult: TClientResult = await client.query(
    `SELECT * FROM "clients" WHERE "id" = $1`,
    [clientId]
  );

  if (!queryResult.rowCount) {
    throw new AppError('Client not found.', 404);
  }

  const foundClient: TClient = queryResult.rows[0];

  res.locals = { ...res.locals, foundClient };

  return next();
};
