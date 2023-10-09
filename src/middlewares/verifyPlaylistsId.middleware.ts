import { NextFunction, Request, Response } from 'express';
import {
  TPlaylists,
  TPlaylistsResult,
} from '../interfaces/playlists.interface';
import { client } from '../database';
import AppError from '../errors/App.error';

export const verifyPlaylistsId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { clientId } = req.params;

  const queryResult: TPlaylistsResult = await client.query(
    `SELECT * FROM "playlists" WHERE "id" = $1`,
    [clientId]
  );

  if (!queryResult.rowCount) {
    throw new AppError('Playlist not found.', 404);
  }

  const foundPlaylists: TPlaylists = queryResult.rows[0];

  res.locals = { ...res.locals, foundPlaylists };

  return next();
};
