import {
  Model,
  AllowNull,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { ITask } from './abstracts/ITask.interface';

@Table({
  updatedAt: false,
  deletedAt: false,
})
export class Task extends Model implements ITask {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isDone: boolean;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;
}
