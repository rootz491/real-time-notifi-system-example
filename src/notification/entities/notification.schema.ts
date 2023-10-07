import * as mongoose from 'mongoose';
import { Notification } from './notification.interface';

export const NotificationSchema = new mongoose.Schema<Notification>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'error'],
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);
