import { Router } from 'express';
import { clientsRoutes } from './clients.route';
import { paymentInfoRoutes } from './paymentInfos.route';
import { playlistsRoutes } from './playlists.route';

export const routes: Router = Router();

routes.use('/clients', clientsRoutes);
routes.use('/paymentInfos', paymentInfoRoutes);
routes.use('/playlists', playlistsRoutes);
