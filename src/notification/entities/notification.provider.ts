import { Connection } from 'mongoose';
import { NotificationSchema } from './notification.schema';
import Constants from '../../constants';

export const NotificationProviders = [
  {
    provide: 'NOTIFICATION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Notification', NotificationSchema),
    inject: [Constants.DatabaseConnectionName],
  },
];
