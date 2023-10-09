import 'express-async-errors';
import { Router } from 'express';
import { verifyEmail } from '../middlewares/verifyEmail.middleware';
import { verifyClientId } from '../middlewares/verifyClientId.middleware';
import {
  createClientController,
  readAllClientsController,
  readClientByIdController,
  updateClientController,
  deleteClientController,
} from '../controllers/clients.controller';

export const clientsRoutes: Router = Router();

clientsRoutes.post('/', verifyEmail, createClientController);
clientsRoutes.get('/', readAllClientsController);

clientsRoutes.use('/:clientId', verifyClientId);
clientsRoutes.get('/:clientId', readClientByIdController);
clientsRoutes.delete('/:clientId', deleteClientController);
clientsRoutes.patch(
  '/:clientId',
  verifyEmail,
  updateClientController
);
