import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'employee_shift', schema: 'airline' })
export class EmployeeShift {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'shift_id' })
  shiftId: number;

  @ApiProperty({ type: () => Employee })
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ApiProperty()
  @Column({ name: 'shift_start', type: 'timestamp' })
  shiftStart: Date;

  @ApiProperty()
  @Column({ name: 'shift_end', type: 'timestamp' })
  shiftEnd: Date;

  @ApiProperty()
  @Column({ name: 'hours_worked', type: 'numeric', generatedType: 'STORED', asExpression: "(EXTRACT(EPOCH FROM (shift_end - shift_start)) / 3600)" })
  hoursWorked: number;

  @ApiProperty()
  @Column({ default: true })
  available: boolean;
}
