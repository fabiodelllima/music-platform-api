import format from 'pg-format';
import { client } from '../database';
import {
  TPaymentInfoCreate,
  TPaymentInfoResult,
  TPaymentInfo,
} from '../interfaces/paymentInfos.interface';

export const createPaymentInfosService = async (
  data: TPaymentInfoCreate
): Promise<TPaymentInfo> => {
  const queryFormat: string = format(
    `INSERT INTO "payment_infos" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TPaymentInfoResult = await client.query(
    queryFormat
  );

  return queryResult.rows[0];
};
