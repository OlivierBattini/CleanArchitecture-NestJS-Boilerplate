import { Body, Controller, Get, Post } from '@nestjs/common';

import { Constants } from 'src/config/Constants';
import { CreateTaskRequest } from './dtos/CreateTaskRequest.dto';
import { TasksService } from './tasks.service';
import { FetchAllTasksResponse } from './dtos/FetchAllTasksResponse.dto';
import { CreateTaskResponse } from './dtos/CreateTaskResponse.dto';

@Controller(Constants.TASKS_PREFIX)
export class TasksController {
  constructor(
    private _tasksService: TasksService,
  ) {}

  @Get()
  async fetchAllTasks(): Promise<FetchAllTasksResponse> {
    const tasks = await this._tasksService.findAll();

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
    const newTask = await this._tasksService.create(request.description);
    
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
