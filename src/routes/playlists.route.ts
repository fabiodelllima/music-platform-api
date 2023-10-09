import 'express-async-errors';
import { Router } from 'express';
import {
  createPlaylistsController,
  readPlaylistsByIdController,
  updatePlaylistsController,
} from '../controllers/playlists.controller';
import { verifyPlaylistsId } from '../middlewares/verifyPlaylistsId.middleware';

export const playlistsRoutes: Router = Router();

playlistsRoutes.post('/:clientId', createPlaylistsController);

playlistsRoutes.use('/:clientId', verifyPlaylistsId);
playlistsRoutes.get('/:clientId', readPlaylistsByIdController);
playlistsRoutes.patch('/:clientId', updatePlaylistsController);
