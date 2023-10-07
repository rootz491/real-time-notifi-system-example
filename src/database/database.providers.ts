import * as mongoose from 'mongoose';
import constants from 'src/constants';

export const databaseProviders = [
  {
    provide: constants.DatabaseConnectionName,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(constants.MongoUrl),
  },
];
