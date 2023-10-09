import { QueryResult } from 'pg';

export type TPaymentInfo = {
  id: number;
  name: string;
  number: string;
  due_date: Date | string;
  code: string;
  method: string;
  client_id: number;
};

export type TPaymentInfoCreate = Omit<TPaymentInfo, 'id'>;

export type TPaymentInfoResult = QueryResult<TPaymentInfo>;
