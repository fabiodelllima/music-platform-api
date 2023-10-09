import { client } from './../database';
import { Request, Response } from 'express';
import {
  TCreatePlaylists,
  TPlaylists,
} from '../interfaces/playlists.interface';
import {
  createPlaylistsService,
  readPlaylistsByIdService,
  updatePlaylistsService,
} from '../services/playlists.service';

export const createPlaylistsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TCreatePlaylists = {
    ...req.body,
    client_id: req.params.clientId,
  };

  const client: TPlaylists = await createPlaylistsService(data);

  return res.status(201).json(client);
};

export const readPlaylistsByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client: TPlaylists = await readPlaylistsByIdService(
    req.params.clientId
  );

  return res.status(200).json(client);
};

export const updatePlaylistsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client: TPlaylists = await updatePlaylistsService(
    req.params.clientId,
    req.body
  );

  return res.status(200).json(client);
};
