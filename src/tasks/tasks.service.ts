import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

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

  async create(description: string): Promise<Task> {
    const newTask = await this.tasksRepository.create<Task>({
      id: uuidv4(),
      description,
      isDone: false,
      createdAt: new Date(),
    });
    return newTask;
  }
}
