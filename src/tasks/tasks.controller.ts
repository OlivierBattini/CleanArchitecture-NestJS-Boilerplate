import { Controller, Get } from '@nestjs/common';

import { Constants } from 'src/config/Constants';
import { TaskDto } from './dtos/task.dto';
import { TasksService } from './tasks.service';

@Controller(Constants.TASKS_PREFIX)
export class TasksController {
  constructor(
    private _tasksService: TasksService,
  ) {}

  @Get()
  async fetchAll(): Promise<TaskDto[]> {
    const tasks = await this._tasksService.findAll();
    return tasks.map((task) => {
      return {
        id: task.id,
        description: task.description,
        isDone: task.isDone,
        createdAt: task.createdAt.toJSON(),
    }});
  }
}
