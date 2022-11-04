import { ITaskEntity } from './ITaskEntity.abstract';

export interface ITaskRepository {
  findAll(): Promise<ITaskEntity[]>;
  create(description: string): Promise<ITaskEntity>;
}