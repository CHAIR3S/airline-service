import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Position } from '../../position/entities/position.entity';

@Entity({ name: 'employee', schema: 'public' })
export class Employee {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'employee_id' })
  employeeId: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ type: () => Position })
  @ManyToOne(() => Position)
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @ApiProperty()
  @Column({ type: 'numeric' })
  salary: number;
}
