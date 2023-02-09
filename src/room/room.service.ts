import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from 'src/response/response.service';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/room.dto';
import { RoomDocument } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomDocument)
    private readonly roomRepository: Repository<RoomDocument>,
    private readonly responseService: ResponseService,
  ) {}

  logger = new Logger('RoomService');

  //** NEW ROOM */
  async create(data: CreateRoomDto): Promise<any> {
    try {
      const newRoom = [];
      const randomNumber = Math.floor(Math.random() * 9999);
      newRoom.push({
        name: data.name,
        code_transcation: `ER-${randomNumber}`,
        users_created: data.users_created,
        users_joined: data.users_joined,
        status: data.status,
      });

      const dataNewRoom = await this.roomRepository.create(newRoom);
      await this.roomRepository.save(dataNewRoom);
      return dataNewRoom;
    } catch (error) {
      throw new BadRequestException(
        this.responseService.error(
          HttpStatus.BAD_REQUEST,
          {
            value: '',
            property: '',
            constraint: [
              `Nama room transaksi ini ${data.name} tidak berhasil dibuat.`,
            ],
          },
          'Bad Request',
        ),
      );
    }
  }

  //** GET ALL ROOM */
  async findAll() {
    try {
      const getAllRoom = await this.roomRepository.find();
      return getAllRoom;
    } catch (error) {
      throw new BadRequestException(
        this.responseService.error(
          HttpStatus.BAD_REQUEST,
          {
            value: '',
            property: '',
            constraint: ['Gagal membuat transcation room.'],
          },
          'Bad Request',
        ),
      );
    }
  }

  /** GET ALL ROOM */
  async findID(room_id: string): Promise<RoomDocument> {
    try {
      const getAllRoom = await this.roomRepository.findOne({
        where: { id: room_id },
      });

      if (!getAllRoom) {
        throw new BadRequestException(
          this.responseService.error(
            HttpStatus.BAD_REQUEST,
            {
              value: '',
              property: '',
              constraint: ['Room transaksi tidak dapat di temukan.'],
            },
            'Bad Request',
          ),
        );
      }

      return getAllRoom;
    } catch (error) {
      throw new BadRequestException(
        this.responseService.error(
          HttpStatus.BAD_REQUEST,
          {
            value: '',
            property: '',
            constraint: ['Room transaksi tidak dapat di temukan.'],
          },
          'Bad Request',
        ),
      );
    }
  }
}
