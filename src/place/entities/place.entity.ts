import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum WeatherType {
  SUNNY = 'SUNNY',
  CLOUDY = 'CLOUDY',
  RAINY = 'RAINY',
  STORMY = 'STORMY',
  SNOWY = 'SNOWY',
  WINDY = 'WINDY',
  FOGGY = 'FOGGY',
}

@Entity('place')
export class Place {
  @PrimaryGeneratedColumn({ name: 'place_id' })
  @ApiProperty()
  placeId: number;

  @Column({ length: 100 })
  @ApiProperty()
  name: string;

  @Column({ length: 100, nullable: true })
  @ApiProperty({ required: false })
  city?: string;

  @Column({ length: 100, nullable: true })
  @ApiProperty({ required: false })
  country?: string;

  @Column({ type: 'enum', enum: WeatherType, nullable: true })
  @ApiProperty({ enum: WeatherType, required: false })
  weather?: WeatherType;

  @Column({ length: 50, nullable: true })
  @ApiProperty({ required: false })
  terminal?: string;

  @Column({ type: 'bytea', nullable: true })
  @Column({ type: 'bytea', nullable: true })
  photo?: Buffer;
}
