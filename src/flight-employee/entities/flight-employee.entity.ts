import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Flight } from '../../flight/entities/flight.entity';
import { Employee } from '../../employee/entities/employee.entity';

@Entity({ name: 'flight_employee', schema: 'airline' })
export class FlightEmployee {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Flight })
  @ManyToOne(() => Flight)
  @JoinColumn({ name: 'flight_id' })
  flight: Flight;

  @ApiProperty({ type: () => Employee })
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ApiProperty({ example: 'PILOT' })
  @Column({ name: 'flight_role', type: 'varchar', length: 50 })
  flightRole: string;
}
