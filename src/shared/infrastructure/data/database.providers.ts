import { Sequelize } from 'sequelize-typescript';

import { Constants } from 'src/config/Constants';
import DatabaseConfig from 'src/config/DatabaseConfig';

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
