import { NextFunction, Request, Response } from 'express';
import { TClientResult } from '../interfaces/clients.interface';
import { client } from '../database';
import AppError from '../errors/App.error';

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const query: string = `SELECT * FROM "clients" WHERE "email" = $1`;

  const queryResult: TClientResult = await client.query(query, [
    email,
  ]);

  if (!email) return next();

  if (queryResult.rowCount) {
    throw new AppError('Email already exists.', 400);
  }

  return next();
};
