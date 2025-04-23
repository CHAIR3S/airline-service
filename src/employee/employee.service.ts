import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { User } from '../user/entities/user.entity';
import { Position } from '../position/entities/position.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const user = await this.userRepository.findOneBy({ userId: dto.userId });
    const position = await this.positionRepository.findOneBy({ positionId: dto.positionId });

    if (!user) throw new NotFoundException(`User with ID ${dto.userId} not found`);
    if (!position) throw new NotFoundException(`Position with ID ${dto.positionId} not found`);

    const employee = this.employeeRepository.create({
      user,
      position,
      salary: dto.salary,
    });

    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['user', 'position'] });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { employeeId: id },
      relations: ['user', 'position'],
    });
    if (!employee) throw new NotFoundException(`Employee with ID ${id} not found`);
    return employee;
  }


  async update(id: number, dto: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);
  
    const user = await this.userRepository.findOneBy({ userId: dto.userId });
    const position = await this.positionRepository.findOneBy({ positionId: dto.positionId });
  
    if (!user) throw new NotFoundException(`User ID ${dto.userId} not found`);
    if (!position) throw new NotFoundException(`Position ID ${dto.positionId} not found`);
  
    employee.user = user;
    employee.position = position;
    employee.salary = dto.salary;
  
    return this.employeeRepository.save(employee);
  }
  

  async remove(id: number): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
