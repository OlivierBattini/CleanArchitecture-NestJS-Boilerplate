import { Sequelize } from 'sequelize-typescript';

import { Constants } from '../../../config/Constants';
import DatabaseConfig from '../../../config/DatabaseConfig';

import { TaskModel } from '../../../tasks/infrastructure/task.model';

export const databaseProviders = [
  {
    provide: Constants.DI_SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(DatabaseConfig.dbUrl, {
        logging: false,
        models: [ TaskModel ],
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
