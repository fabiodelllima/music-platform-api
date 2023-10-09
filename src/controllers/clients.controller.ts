import { Request, Response } from 'express';
import {
  createClientService,
  deleteClientService,
  readAllClientsService,
  readClientByIdService,
  updateClientService,
} from '../services/clients.service';
import {
  TClient,
  TClientRead,
} from '../interfaces/clients.interface';

export const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client: TClient = await createClientService(req.body);

  return res.status(201).json(client);
};

export const readAllClientsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clients: TClientRead = await readAllClientsService();

  return res.status(200).json(clients);
};

export const readClientByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client: TClient = await readClientByIdService(
    req.params.clientId
  );

  return res.status(200).json(client);
};

export const updateClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client: TClient = await updateClientService(
    req.params.clientId,
    req.body
  );

  return res.status(200).json(client);
};

export const deleteClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteClientService(req.params.clientId);

  return res.status(204).json();
};
