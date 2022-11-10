import { Module } from '@nestjs/common';

import { Constants } from '../config/Constants';
import { DatabaseModule } from '../shared/infrastructure/data/database.module';
import { TaskController } from './infrastructure/task.controller';
import { TaskRepository } from './infrastructure/task.repository';
import { TaskModel } from './infrastructure/task.model';
import { TaskUseCases } from './usecases/task.usecases';
import { TaskFactory } from './infrastructure/task.factory';

@Module({
  imports: [ DatabaseModule ],
  controllers: [ TaskController ],
  providers: [
    {
      provide: Constants.DI_TASK_USECASES,
      useClass: TaskUseCases,
    },
    {
      provide: Constants.DI_TASK_FACTORY,
      useClass: TaskFactory,
    },
    {
      provide: Constants.DI_TASK_REPOSITORY,
      useClass: TaskRepository,
    },
    {
      provide: Constants.DI_TASK_MODEL,
      useValue: TaskModel,
    },
  ],
})
export class TaskModule {}
