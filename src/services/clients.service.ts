import format from 'pg-format';
import { client } from '../database';
import {
  TClient,
  TCreateClient,
} from '../interfaces/clients.interface';
import {
  TClientRead,
  TClientResult,
  TClientUpdate,
} from './../interfaces/clients.interface';

export const createClientService = async (
  data: TCreateClient
): Promise<TClient> => {
  const queryFormat: string = format(
    `INSERT INTO "clients" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TClientResult = await client.query(
    queryFormat
  );

  return queryResult.rows[0];
};

export const readAllClientsService =
  async (): Promise<TClientRead> => {
    const query: string = `SELECT * FROM "clients"`;
    const queryResult: TClientResult = await client.query(query);

    return queryResult.rows;
  };

export const readClientByIdService = async (
  clientId: string
): Promise<TClient> => {
  const query: string = `
    SELECT
      "c"."id" AS "clientId",
      "c"."name" AS "clientName",
      "c"."email" AS "clientEmail",
      "pi"."name" AS "cardName",
      "pi"."number" AS "cardNumber",
      "pi"."due_date" AS "cardDate",
      "pi"."method" AS "cardMethod"
    FROM "clients" AS "c"
    LEFT JOIN "payment_infos" AS "pi"
      ON "pi"."client_id" = "c"."id"
    WHERE "c"."id" = $1;
  `;

  const queryResult: TClientResult = await client.query(query, [
    clientId,
  ]);

  return queryResult.rows[0];
};

export const updateClientService = async (
  clientId: string,
  data: TClientUpdate
): Promise<TClient> => {
  const queryFormat: string = format(
    `UPDATE "clients" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TClientResult = await client.query(
    queryFormat,
    [clientId]
  );

  return queryResult.rows[0];
};

export const deleteClientService = async (
  clientId: string
): Promise<void> => {
  const query: string = `DELETE FROM "clients" WHERE "id" = $1;`;

  await client.query(query, [clientId]);
};
