import { QueryResult } from 'pg';

export type TClient = {
  id: number;
  name: string;
  email: string;
};

export type TCreateClient = Omit<TClient, 'id'>;

export type TClientResult = QueryResult<TClient>;

export type TClientRead = TClient[];

export type TClientUpdate = Partial<TClient>;
