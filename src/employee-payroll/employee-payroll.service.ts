import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeePayrollDto } from './dto/create-employee-payroll.dto';
import { EmployeePayroll } from './entities/employee-payroll.entity';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class EmployeePayrollService {
  constructor(
    @InjectRepository(EmployeePayroll)
    private readonly payrollRepo: Repository<EmployeePayroll>,

    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeePayrollDto): Promise<EmployeePayroll> {
    const employee = await this.employeeRepo.findOneBy({ employeeId: dto.employeeId });
    if (!employee) throw new NotFoundException(`Employee ID ${dto.employeeId} not found`);

    const payroll = this.payrollRepo.create({
      employee,
      periodStart: dto.periodStart,
      periodEnd: dto.periodEnd,
      hoursWorked: dto.hoursWorked,
      totalPayment: dto.totalPayment,
    });

    return this.payrollRepo.save(payroll);
  }

  async findAll(): Promise<EmployeePayroll[]> {
    return this.payrollRepo.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<EmployeePayroll> {
    const payroll = await this.payrollRepo.findOne({
      where: { payrollId: id },
      relations: ['employee'],
    });

    if (!payroll) throw new NotFoundException(`Payroll with ID ${id} not found`);
    return payroll;
  }

  async remove(id: number): Promise<void> {
    const result = await this.payrollRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payroll with ID ${id} not found`);
    }
  }
}
