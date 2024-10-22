export type Server = {
  id: number;
  name: string;
};

export interface IServerRepository {
  getServers(): Promise<Server[]>;
}
