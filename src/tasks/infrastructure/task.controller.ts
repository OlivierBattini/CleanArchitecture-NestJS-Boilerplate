import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post } from '@nestjs/common';
import { Result } from 'src/shared/domain/result/Result';
import { HttpError } from 'src/shared/infrastructure/http/errors/http.error';

import { Constants } from '../../config/Constants';
import { ITaskUseCases } from '../abstracts/ITaskUseCases.abstract';
import { Task } from '../entities/task.entity';
import { CreateTaskRequest } from '../usecases/create-task/fetch-all-tasks.request';
import { CreateTaskResponse } from '../usecases/create-task/fetch-all-tasks.response';
import { DeleteTaskParams } from '../usecases/delete-task/delete-task.params';
import { FetchAllTasksResponse } from '../usecases/fetch-all-tasks/fetch-all-tasks.response';
import { UpdateTaskParams } from '../usecases/update-task/update-task.params';
import { UpdateTaskRequest } from '../usecases/update-task/update-task.request';
import { UpdateTaskResponse } from '../usecases/update-task/update-task.response';

@Controller(Constants.API_PREFIX_TASKS)
export class TaskController {
  constructor(
    @Inject(Constants.DI_TASK_USECASES)
    private _taskUseCases: ITaskUseCases,
  ) {}

  @Get()
  async fetchAllTasks(): Promise<FetchAllTasksResponse> {
    const tasks: Result<Task[]> = await this._taskUseCases.fetchAllTasks();

    if (tasks.isFailure) {
      return HttpError.internalServerError();
    }

    const response: FetchAllTasksResponse = {
      tasks: tasks.value.map((task) => {
        return {
          id: task.id,
          description: task.props.taskDescription,
          isDone: task.props.taskIsDone,
          createdAt: task.props.taskCreatedAt.toJSON(),
      }})
    };
    return response;
  }

  @Post()
  @HttpCode(201)
  async createTask(
    @Body() request: CreateTaskRequest
  ): Promise<CreateTaskResponse> {
    const newTaskResult: Result<Task> = await this._taskUseCases.createTask(request);

    if (newTaskResult.isFailure) {
      HttpError.internalServerError();
    }
    
    const newTask = newTaskResult.value;
    const response: CreateTaskResponse = {
      task: {
        id: newTask.id,
        description: newTask.props.taskDescription,
        isDone: newTask.props.taskIsDone,
        createdAt: newTask.props.taskCreatedAt.toJSON(),
      }
    }
    return response;
  }

  @Patch(':id')
  @HttpCode(204)
  async updateTask(
    @Param() params: UpdateTaskParams,
    @Body() request: UpdateTaskRequest
  ): Promise<UpdateTaskResponse> {
    const updateTaskResult = await this._taskUseCases.updateTask(params, request);

    if (updateTaskResult.isFailure) {
      HttpError.badRequest();
    }

    const updatedTask: Task = updateTaskResult.value;
    const response: UpdateTaskResponse = {
      task: {
        id: updatedTask.id,
        description: updatedTask.props.taskDescription,
        isDone: updatedTask.props.taskIsDone,
        createdAt: updatedTask.props.taskCreatedAt.toJSON(),
      }
    };
    return response;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(
    @Param() params: DeleteTaskParams,
  ): Promise<null> {
    const deleteTaskResult = await this._taskUseCases.deleteTask(params);

    if (deleteTaskResult.isFailure) {
      HttpError.badRequest();
    }
    return null;
  }
}
