import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from 'src/response/response.service';
import { MessageService } from 'src/message/message.service';
import { RoomDocument } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomDocument])],
  controllers: [RoomController],
  providers: [RoomService, ResponseService, MessageService],
})
export class RoomModule {}
