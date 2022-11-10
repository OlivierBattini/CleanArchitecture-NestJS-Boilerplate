import {
  Model,
  AllowNull,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { ITaskModel } from '../abstracts/ITaskModel.abstract';

@Table({
  tableName: 'task',
  updatedAt: false,
  deletedAt: false,
})
export class TaskModel extends Model implements ITaskModel {
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
