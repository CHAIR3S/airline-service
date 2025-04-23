import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaggageService } from './baggage.service';
import { CreateBaggageDto } from './dto/create-baggage.dto';
import { UpdateBaggageDto } from './dto/update-baggage.dto';

@Controller('baggage')
export class BaggageController {
  constructor(private readonly baggageService: BaggageService) {}

  @Post()
  create(@Body() createBaggageDto: CreateBaggageDto) {
    return this.baggageService.create(createBaggageDto);
  }

  @Get()
  findAll() {
    return this.baggageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baggageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaggageDto: UpdateBaggageDto) {
    return this.baggageService.update(+id, updateBaggageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baggageService.remove(+id);
  }
}
