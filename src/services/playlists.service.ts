import format from 'pg-format';
import { client } from '../database';
import {
  TPlaylists,
  TCreatePlaylists,
} from '../interfaces/playlists.interface';
import {
  TPlaylistsResult,
  TPlaylistsUpdate,
} from './../interfaces/playlists.interface';

export const createPlaylistsService = async (
  data: TCreatePlaylists
): Promise<TPlaylists> => {
  const queryFormat: string = format(
    `INSERT INTO "playlists" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TPlaylistsResult = await client.query(
    queryFormat
  );

  return queryResult.rows[0];
};

export const readPlaylistsByIdService = async (
  clientId: string
): Promise<TPlaylists> => {
  const query: string = `
    SELECT
      "p"."id" AS "playlistId",
      "p"."name" AS "playlistName",
      "p"."created_at" AS "playlistCreatedAt",
      "c"."id" AS "clientId",
      "c"."name" AS "clientName"
    FROM "playlists" AS "p"
    LEFT JOIN "clients" AS "c"
      ON "p"."client_id" = "c"."id"
    WHERE "p"."id" = $1;
  `;

  const queryResult: TPlaylistsResult = await client.query(
    query,
    [clientId]
  );

  return queryResult.rows[0];
};

export const updatePlaylistsService = async (
  clientId: string,
  data: TPlaylistsUpdate
): Promise<TPlaylists> => {
  const queryFormat: string = format(
    `UPDATE "playlists" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TPlaylistsResult = await client.query(
    queryFormat,
    [clientId]
  );

  return queryResult.rows[0];
};
