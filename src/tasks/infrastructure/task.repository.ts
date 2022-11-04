import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Constants } from 'src/config/Constants';
import { TaskModel } from './task.model';
import { ITaskRepository } from '../abstracts/ITaskRepository.abstract';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @Inject(Constants.DI_TASK_MODEL)
    private taskModel: typeof TaskModel
  ) {}

  async findAll(): Promise<TaskModel[]> {
    return this.taskModel.findAll<TaskModel>();
  }

  async create(description: string): Promise<TaskModel> {
    const newTask = await this.taskModel.create<TaskModel>({
      id: uuidv4(),
      description,
      isDone: false,
      createdAt: new Date(),
    });
    return newTask;
  }
}
