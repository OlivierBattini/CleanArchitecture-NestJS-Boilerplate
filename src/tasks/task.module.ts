import { Module } from '@nestjs/common';

import { Constants } from 'src/config/Constants';
import { TaskController } from './infrastructure/task.controller';
import { TaskRepository } from './infrastructure/task.repository';
import { DatabaseModule } from '../shared/infrastructure/data/database.module';
import { TaskModel } from './infrastructure/task.model';

@Module({
  imports: [ DatabaseModule ],
  controllers: [ TaskController ],
  providers: [
    {
      provide: Constants.DI_TASK_REPOSITORY,
      useValue: TaskRepository,
    },
    {
      provide: Constants.DI_TASK_MODEL,
      useValue: TaskModel,
    },
  ],
})
export class TaskModule {}
