import { Sequelize } from 'sequelize-typescript';

import { Constants } from 'src/config/Constants';
import DatabaseConfig from 'src/config/DatabaseConfig';

import { Task } from '../../../tasks/Task.entity';

export const databaseProviders = [
  {
    provide: Constants.SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(DatabaseConfig.dbUrl, {
        logging: false,
        models: [ Task ],
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
