import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  passport: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  frequent?: boolean;

  @ApiProperty({ example: { language: 'en', seat: 'window' } })
  @IsOptional()
  preferences?: Record<string, any>;
}
