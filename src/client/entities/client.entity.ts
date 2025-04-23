import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'client', schema: 'public' })
export class Client {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'client_id' })
  clientId: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: 'AB123456' })
  @Column({ type: 'varchar', unique: true })
  passport: string;

  @ApiProperty({ example: '+521234567890' })
  @Column({ type: 'varchar' })
  phone: string;

  @ApiProperty({ default: false })
  @Column({ type: 'boolean', default: false })
  frequent: boolean;

  @ApiProperty({ example: { language: 'en', seat: 'window' } })
  @Column({ type: 'jsonb' })
  preferences: Record<string, any>;
}
