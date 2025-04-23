import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'position', schema: 'public' })
export class Position {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'position_id' })
  positionId: number;

  @ApiProperty({ example: 'PILOT' })
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;
}
