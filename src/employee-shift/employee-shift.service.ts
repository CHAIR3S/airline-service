import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeShift } from './entities/employee-shift.entity';
import { CreateEmployeeShiftDto } from './dto/create-employee-shift.dto';
import { UpdateEmployeeShiftDto } from './dto/update-employee-shift.dto';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class EmployeeShiftService {
  constructor(
    @InjectRepository(EmployeeShift)
    private readonly shiftRepo: Repository<EmployeeShift>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeShiftDto): Promise<EmployeeShift> {
    const employee = await this.employeeRepo.findOneBy({ employeeId: dto.employeeId });
    if (!employee) throw new NotFoundException(`Employee ID ${dto.employeeId} not found`);

    const shift = this.shiftRepo.create({
      employee,
      shiftStart: dto.shiftStart,
      shiftEnd: dto.shiftEnd,
      available: dto.available,
    });

    return this.shiftRepo.save(shift);
  }

  async findAll(): Promise<EmployeeShift[]> {
    return this.shiftRepo.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<EmployeeShift> {
    const shift = await this.shiftRepo.findOne({
      where: { shiftId: id },
      relations: ['employee'],
    });
    if (!shift) throw new NotFoundException(`Shift ID ${id} not found`);
    return shift;
  }

  async update(id: number, dto: UpdateEmployeeShiftDto): Promise<EmployeeShift> {
    const shift = await this.findOne(id);

    if (dto.employeeId) {
      const employee = await this.employeeRepo.findOneBy({ employeeId: dto.employeeId });
      if (!employee) throw new NotFoundException(`Employee ID ${dto.employeeId} not found`);
      shift.employee = employee;
    }

    Object.assign(shift, {
      ...dto,
      shiftStart: dto.shiftStart ?? shift.shiftStart,
      shiftEnd: dto.shiftEnd ?? shift.shiftEnd,
      available: dto.available ?? shift.available,
    });

    return this.shiftRepo.save(shift);
  }

  async remove(id: number): Promise<void> {
    const result = await this.shiftRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Shift ID ${id} not found`);
  }
}
