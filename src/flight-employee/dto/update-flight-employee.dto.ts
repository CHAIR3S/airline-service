import { PartialType } from '@nestjs/swagger';
import { CreateFlightEmployeeDto } from './create-flight-employee.dto';

export class UpdateFlightEmployeeDto extends PartialType(CreateFlightEmployeeDto) {}
