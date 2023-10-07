import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationProviders } from './entities/notification.provider';
import { DatabaseModule } from 'src/database/database.module';
// import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    // AuthModule,
    DatabaseModule,
  ],
  providers: [
    NotificationGateway,
    NotificationService,
    ...NotificationProviders,
  ],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
