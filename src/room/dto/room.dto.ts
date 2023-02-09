import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from '@nestjs/class-validator';
import { enumStatusRoom } from '../entities/room.entity';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code_transcation: string;

  @IsUUID()
  @IsOptional()
  users_created: string;

  @IsUUID()
  @IsOptional()
  users_joined: string[];

  @IsString()
  status: enumStatusRoom;
}
