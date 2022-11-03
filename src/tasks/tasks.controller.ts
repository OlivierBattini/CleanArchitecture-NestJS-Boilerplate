import { Body, Controller, Get, Post } from '@nestjs/common';

import { Constants } from 'src/config/Constants';
import { TaskDto } from './dtos/task.dto';
import { CreateTaskRequest } from './dtos/CreateTaskRequest.dto';
import { TasksService } from './tasks.service';

@Controller(Constants.TASKS_PREFIX)
export class TasksController {
  constructor(
    private _tasksService: TasksService,
  ) {}

  @Get()
  async fetchAllTasks(): Promise<TaskDto[]> {
    const tasks = await this._tasksService.findAll();
    return tasks.map((task) => {
      return {
        id: task.id,
        description: task.description,
        isDone: task.isDone,
        createdAt: task.createdAt.toJSON(),
    }});
  }

  @Post()
  async createTask(
    @Body() request: CreateTaskRequest
  ): Promise<TaskDto> {
    const newTask = await this._tasksService.create(request.description);
    return {
      id: newTask.id,
      description: newTask.description,
      isDone: newTask.isDone,
      createdAt: newTask.createdAt.toJSON(),
    };
  }
}
