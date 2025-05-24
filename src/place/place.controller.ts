import { Controller, Post, Get, Param, Body, Delete, ParseFloatPipe } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('place')
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  create(@Body() dto: CreatePlaceDto) {
    return this.placeService.create(dto);
  }

  
  @Public()
  @Get('nearest/:lat/:lng')
  getNearestPlace(
    @Param('lat', ParseFloatPipe) lat: number,
    @Param('lng', ParseFloatPipe) lng: number,
  ) {
    return this.placeService.findNearestPlace(lat, lng);
  }

  @Get()
  findAll() {
    return this.placeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeService.remove(+id);
  }

  


}
