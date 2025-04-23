import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlightEmployee } from './entities/flight-employee.entity';
import { CreateFlightEmployeeDto } from './dto/create-flight-employee.dto';
import { UpdateFlightEmployeeDto } from './dto/update-flight-employee.dto';
import { Flight } from '../flight/entities/flight.entity';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class FlightEmployeeService {
  constructor(
    @InjectRepository(FlightEmployee)
    private readonly repo: Repository<FlightEmployee>,
    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async create(dto: CreateFlightEmployeeDto): Promise<FlightEmployee> {
    const flight = await this.flightRepo.findOneBy({ flightId: dto.flightId });
    const employee = await this.employeeRepo.findOneBy({ employeeId: dto.employeeId });

    if (!flight) throw new NotFoundException(`Flight ID ${dto.flightId} not found`);
    if (!employee) throw new NotFoundException(`Employee ID ${dto.employeeId} not found`);

    const assignment = this.repo.create({ flight, employee, flightRole: dto.flightRole });
    return this.repo.save(assignment);
  }

  async findAll(): Promise<FlightEmployee[]> {
    return this.repo.find({ relations: ['flight', 'employee'] });
  }

  async findOne(id: number): Promise<FlightEmployee> {
    const assignment = await this.repo.findOne({ where: { id }, relations: ['flight', 'employee'] });
    if (!assignment) throw new NotFoundException(`Assignment ID ${id} not found`);
    return assignment;
  }

  async update(id: number, dto: UpdateFlightEmployeeDto): Promise<FlightEmployee> {
    const assignment = await this.findOne(id);

    if (dto.flightId) {
      const flight = await this.flightRepo.findOneBy({ flightId: dto.flightId });
      if (!flight) throw new NotFoundException(`Flight ID ${dto.flightId} not found`);
      assignment.flight = flight;
    }

    if (dto.employeeId) {
      const employee = await this.employeeRepo.findOneBy({ employeeId: dto.employeeId });
      if (!employee) throw new NotFoundException(`Employee ID ${dto.employeeId} not found`);
      assignment.employee = employee;
    }

    if (dto.flightRole !== undefined) {
      assignment.flightRole = dto.flightRole;
    }

    return this.repo.save(assignment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Assignment ID ${id} not found`);
    }
  }
}
