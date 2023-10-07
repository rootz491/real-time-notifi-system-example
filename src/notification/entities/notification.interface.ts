import { Document, PopulatedDoc } from 'mongoose';
// import { User } from 'src/auth/user.entity/user.interface';

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export class Notification extends Document {
  readonly title: string;
  readonly description: string;
  readonly icon?: string;
  readonly type: NotificationType;
  readonly read: boolean;
  // readonly user: PopulatedDoc<User & Document>;
}
