import { Injectable, Inject } from '@nestjs/common';

import { Constants } from '../../config/Constants';
import { ITaskUseCases } from '../abstracts/ITaskUseCases.abstract';
import { ITaskRepository } from '../abstracts/ITaskRepository.abstract';
import { Result } from 'src/shared/domain/result/Result';
import { Task } from '../entities/task.entity';
import { RepositoryError } from 'src/shared/domain/errors/repository.error';
import { CreateTaskRequest } from './create-task/fetch-all-tasks.request';
import { FetchAllTasksResult } from './fetch-all-tasks/fetch-all-tasks.result';
import { UpdateTaskRequest } from './update-task/update-task.request';
import { DeleteTaskParams } from './delete-task/delete-task.params';
import { UpdateTaskParams } from './update-task/update-task.params';

@Injectable()
export class TaskUseCases implements ITaskUseCases {
  constructor(
    @Inject(Constants.DI_TASK_REPOSITORY)
    private _taskRepository: ITaskRepository
  ) {}

  async fetchAllTasks(): Promise<FetchAllTasksResult> {
    const taskCollection: Task[] = await this._taskRepository.findAll();
    if (taskCollection) {
      return Result.success<Task[]>(taskCollection);
    } else {
      return Result.failure<Task[]>(new RepositoryError());
    }
  }

  async createTask(request: CreateTaskRequest): Promise<Result<Task>> {
    const newTaskResult: Result<Task> = Task.create({
      taskDescription: request.description,
      taskIsDone: false,
      taskCreatedAt: undefined
    });
    if (newTaskResult.isFailure) {
      return newTaskResult;
    }

    const createdTask: Task = await this._taskRepository.create(newTaskResult.value);
    if (!createdTask) {
      return Result.failure<Task>(new RepositoryError());
    }
    return Result.success(createdTask);
  }
  
  async updateTask(params: UpdateTaskParams, request: UpdateTaskRequest): Promise<Result<Task>> {
    const task: Task = await this._taskRepository.findById(params.id);
    if (!task) {
      return Result.failure<Task>(new RepositoryError());
    }

    const taskResult: Result<Task> = Task.create({
      taskDescription: request.description,
      taskIsDone: request.isDone,
      taskCreatedAt: task.props.taskCreatedAt,
    },
      params.id
    );

    if (taskResult.isSuccess) {
      await this._taskRepository.update(taskResult.value);
    }

    return taskResult;
  }

  async deleteTask(params: DeleteTaskParams): Promise<Result<void>> {
    await this._taskRepository.delete(params.id);
    return Result.success();
  }
}
