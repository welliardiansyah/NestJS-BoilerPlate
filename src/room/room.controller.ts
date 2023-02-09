import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { ResponseService } from 'src/response/response.service';
import { CreateRoomDto } from './dto/room.dto';
import { RoomService } from './room.service';

@Controller('api/v1/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly responseService: ResponseService,
    private readonly messageService: MessageService,
  ) {}

  @Post()
  async create(@Body() data: CreateRoomDto): Promise<any> {
    const createdRoom = await this.roomService.create(data);

    return this.responseService.success(
      true,
      'Room transaksi berhasil dibuat.',
      createdRoom,
    );
  }

  @Get()
  async findAll() {
    const getAllRoom = await this.roomService.findAll();

    return this.responseService.success(
      true,
      'berhasil mendapatkan data room transaksi.',
      getAllRoom,
    );
  }

  @Get(':room_id')
  async findByID(@Param('room_id') room_id: string): Promise<any> {
    const getAllRoom = await this.roomService.findID(room_id);

    return this.responseService.success(
      true,
      'berhasil mendapatkan data room transaksi.',
      getAllRoom,
    );
  }
}
