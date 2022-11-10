import { Injectable, Inject } from '@nestjs/common';

import { Constants } from '../../config/Constants';
import { TaskModel } from './task.model';
import { Result } from 'src/shared/domain/result/Result';
import { Task } from '../entities/task.entity';
import { ITaskRepository } from '../abstracts/ITaskRepository.abstract';
import { IFactory } from 'src/shared/domain/abstracts/factory.abstract';
import { TaskDto } from '../dtos/task.dto';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @Inject(Constants.DI_TASK_MODEL)
    private _taskModel: typeof TaskModel,
    @Inject(Constants.DI_TASK_FACTORY)
    private _taskFactory: IFactory<Task, TaskModel, TaskDto>,
  ) {}

  async findAll(): Promise<Task[]> {
    try {
      const taskModelCollection: TaskModel[] = await this._taskModel.findAll();
      const taskCollectionResult = this._taskFactory.fromModelCollection(taskModelCollection);

      if (taskCollectionResult.isFailure) {
        return null;
      }
      return taskCollectionResult.value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findById(id: string): Promise<Task> {
    try {
      const taskModel: TaskModel = await this._taskModel.findByPk(id);
      const taskResult = this._taskFactory.fromModel(taskModel);

      if (taskResult.isFailure) {
        return null;
      }
      return taskResult.value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async create(task: Task): Promise<Task> {
    try {
      const newTaskModel: TaskModel = await this._taskModel.create({
        id: task.id,
        description: task.props.taskDescription,
        isDone: task.props.taskIsDone,
        createdAt: task.props.taskCreatedAt,
      });
      const newTaskResult: Result<Task> = this._taskFactory.fromModel(newTaskModel);
      if (newTaskResult.isFailure) {
        return null;
      }
      return newTaskResult.value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(task: Task): Promise<void> {
    try {
      await this._taskModel.upsert({
        id: task.id,
        description: task.props.taskDescription,
        isDone: task.props.taskIsDone,
        createdAt: task.props.taskCreatedAt,
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  async delete(taskId: string): Promise<void> {
    try {
      await this._taskModel.destroy({
        where: {
          id: taskId,
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
