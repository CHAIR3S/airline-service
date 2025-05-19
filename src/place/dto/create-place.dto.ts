import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WeatherType } from '../entities/place.entity';

export class CreatePlaceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    enum: ['SUNNY', 'CLOUDY', 'RAINY', 'STORMY', 'SNOWY', 'WINDY', 'FOGGY'],
    required: false,
  })
  @IsOptional()
  @IsEnum(WeatherType)
  weather?: WeatherType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  terminal?: string;

  @ApiProperty({ required: false, description: 'Imagen en base64' })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  discount?: number;
}
