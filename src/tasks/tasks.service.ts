import { Injectable, Inject } from '@nestjs/common';

import { Constants } from 'src/config/Constants';
import { Task } from './Task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(Constants.TASKS_REPOSITORY)
    private tasksRepository: typeof Task
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll<Task>();
  }
}
