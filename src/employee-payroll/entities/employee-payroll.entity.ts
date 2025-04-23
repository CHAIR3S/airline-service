import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Employee } from '../../employee/entities/employee.entity';
  
  @Entity({ name: 'employee_payroll', schema: 'airline' })
  export class EmployeePayroll {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'payroll_id' })
    payrollId: number;
  
    @ApiProperty({ type: () => Employee })
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
  
    @ApiProperty({ example: '2025-04-01' })
    @Column({ name: 'period_start', type: 'date' })
    periodStart: string;
  
    @ApiProperty({ example: '2025-04-15' })
    @Column({ name: 'period_end', type: 'date' })
    periodEnd: string;
  
    @ApiProperty()
    @Column({ name: 'hours_worked', type: 'numeric' })
    hoursWorked: number;
  
    @ApiProperty()
    @Column({ name: 'total_payment', type: 'numeric' })
    totalPayment: number;
  
    @ApiProperty({ example: '2025-04-15T12:00:00Z' })
    @Column({ name: 'payment_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    paymentDate: Date;
  }
  