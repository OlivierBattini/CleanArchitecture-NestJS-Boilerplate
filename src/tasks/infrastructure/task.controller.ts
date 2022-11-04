import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { Constants } from 'src/config/Constants';
import { ITaskRepository } from '../abstracts/ITaskRepository.abstract';
import { CreateTaskRequest } from '../dtos/CreateTaskRequest.dto';
import { FetchAllTasksResponse } from '../dtos/FetchAllTasksResponse.dto';
import { CreateTaskResponse } from '../dtos/CreateTaskResponse.dto';

@Controller(Constants.API_PREFIX_TASKS)
export class TaskController {
  constructor(
    @Inject(Constants.DI_TASK_MODEL)
    private _taskService: ITaskRepository,
  ) {}

  @Get()
  async fetchAllTasks(): Promise<FetchAllTasksResponse> {
    const tasks = await this._taskService.findAll();

    const response = new FetchAllTasksResponse();
    response.tasks = tasks.map((task) => {
      return {
        id: task.id,
        description: task.description,
        isDone: task.isDone,
        createdAt: task.createdAt.toJSON(),
    }});
    return response;
  }

  @Post()
  async createTask(
    @Body() request: CreateTaskRequest
  ): Promise<CreateTaskResponse> {
    const newTask = await this._taskService.create(request.description);
    
    const response = new CreateTaskResponse();
    response.task = {
      id: newTask.id,
      description: newTask.description,
      isDone: newTask.isDone,
      createdAt: newTask.createdAt.toJSON(),
    }
    return response;
  }
}
