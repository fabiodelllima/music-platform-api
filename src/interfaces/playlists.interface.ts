import { QueryResult } from 'pg';

export type TPlaylists = {
  id: number;
  name: string;
  created_at: Date;
  client_id: number;
};

export type TCreatePlaylists = Omit<TPlaylists, 'id'>;

export type TPlaylistsResult = QueryResult<TPlaylists>;

export type TPlaylistsRead = TPlaylists[];

export type TPlaylistsUpdate = Partial<TPlaylists>;
