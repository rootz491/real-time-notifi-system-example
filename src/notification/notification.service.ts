import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Model } from 'mongoose';
import { Notification } from './entities/notification.interface';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_MODEL')
    private readonly notificationModel: Model<Notification>,
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto);
  }

  findAll({ userId, limit = 10, skip = 0 }) {
    if (!userId) throw new Error('userId is required');
    return this.notificationModel
      .find({
        user: userId,
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
  }

  findOne(id: string) {
    return this.notificationModel.findById(id).lean();
  }

  markRead(id: string) {
    return this.notificationModel.findByIdAndUpdate(
      id,
      {
        read: true,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.notificationModel.findByIdAndDelete(id);
  }
}
