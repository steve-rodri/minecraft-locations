export type Point = {
  id: number;
  label: string;
  x: number;
  y: number;
  z: number;
};

export type CreatePointData = Omit<Point, "id"> & { server_id: number };
export type EditPointData = Point & { server_id?: number };

export interface IPointRepository {
  getPoint(id: number): Promise<Point | null>;
  getPoints(serverId: number): Promise<Point[]>;
  createPoint(args: CreatePointData): Promise<Point | undefined>;
  editPoint(args: EditPointData): Promise<Point | null>;
  deletePoint(id: number): Promise<{ success: boolean }>;
}
