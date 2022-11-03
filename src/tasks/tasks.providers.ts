import { Constants } from 'src/config/Constants';
import { Task } from './Task.entity';

export const tasksProviders = [
  {
    provide: Constants.TASKS_REPOSITORY,
    useValue: Task,
  },
];
