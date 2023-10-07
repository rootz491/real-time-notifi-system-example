import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { Server, Socket } from 'socket.io';
import { HttpException, Inject, OnModuleInit } from '@nestjs/common';
import { Notification } from './entities/notification.interface';

interface JwtPayload {
  _id: string;
  email?: string;
  username?: string;
  iat?: number;
  exp?: number;
}

export interface socketMetaPayload extends JwtPayload {
  socketId: string;
}

@WebSocketGateway({
  crossOriginIsolated: true,
})
export class NotificationGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  socketMap = new Map<string, socketMetaPayload>();

  constructor(
    // private readonly authService: AuthService,  // TODO import AuthService if you have one.
    private readonly notificationService: NotificationService,
  ) {}

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      // TODO uncomment this if you plan to have authentication for socket connection.
      // const token = socket.handshake.headers.authorization?.split(' ')[1];
      // if (!token) {
      //   socket.disconnect(true);
      //   return;
      // }

      // TODO uncomment this when you have AuthService to verify JWT and get user payload from it.
      // const payload = await this.authService.verifyJwt(token);
      // if (!payload) {
      //   socket.disconnect(true);
      //   return;
      // }

      // TODO when authenticated, keep track of the socket connection / user.
      // this.socketMap.set(payload._id, {
      //   ...payload,
      //   socketId: socket.id,
      // });

      socket.on('disconnect', () => {
        // TODO uncomment, to remove the user from the socketMap when disconnected.
        // this.socketMap.delete(socket.id);
      });
    });
  }

  async emitNotification(userId: string, notification: Partial<Notification>) {
    const socketMeta = this.socketMap.get(userId);
    const notif = await this.notificationService.create(notification);
    if (socketMeta) {
      this.server.to(socketMeta?.socketId).emit('notification', notif);
    } else {
      console.log('user is not online at the moment!');
    }
  }

  @SubscribeMessage('currentUsers')
  async currentUsers(client: Socket) {
    client.emit('currentUsers', Array.from(this.socketMap.values()));
  }
}
