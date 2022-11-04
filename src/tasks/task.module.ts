import { Module } from '@nestjs/common';

import { Constants } from '../config/Constants';
import { DatabaseModule } from '../shared/infrastructure/data/database.module';
import { TaskController } from './infrastructure/task.controller';
import { TaskRepository } from './infrastructure/task.repository';
import { TaskModel } from './infrastructure/task.model';

@Module({
  imports: [ DatabaseModule ],
  controllers: [ TaskController ],
  providers: [
    {
      provide: Constants.DI_TASK_MODEL,
      useValue: TaskModel,
    },
    {
      provide: Constants.DI_TASK_REPOSITORY,
      useClass: TaskRepository,
    },
  ],
})
export class TaskModule {}
