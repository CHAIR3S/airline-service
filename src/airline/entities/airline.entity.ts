import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Flight } from 'src/flight/entities/flight.entity';
import { Aircraft } from 'src/aircraft/entities/aircraft.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Entity()
export class Airline {
  @PrimaryGeneratedColumn({ name: 'airline_id' }) 
  @ApiProperty()
  airlineId: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  country?: string;

  @Column({ type: 'varchar', length: 3, unique: true, name: 'iata_code' })
  @ApiProperty()
  iataCode: string;

  @Column({ type: 'varchar', nullable: true, name: 'logo_url' })
  @ApiProperty()
  logoUrl?: string;

  @OneToMany(() => Flight, flight => flight.airline)
  flights: Flight[];

  @OneToMany(() => Aircraft, aircraft => aircraft.airline)
  aircrafts: Aircraft[];

  @OneToMany(() => Employee, employee => employee.airline)
  employees: Employee[];
}