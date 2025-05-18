import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';


@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

 create(dto: CreatePlaceDto) {
  const newPlace = this.placeRepository.create({
    ...dto,
    photo: dto.photo ? Buffer.from(dto.photo, 'base64') : undefined,
  });
  return this.placeRepository.save(newPlace);
}

  findAll() {
    return this.placeRepository.find();
  }

  findOne(id: number) {
    return this.placeRepository.findOneBy({ placeId: id });
  }

async update(id: number, dto: UpdatePlaceDto) {
  const data = {
    ...dto,
    photo: dto.photo ? Buffer.from(dto.photo, 'base64') : undefined,
  };
  await this.placeRepository.update(id, data);
  return this.findOne(id);
}

  remove(id: number) {
    return this.placeRepository.delete(id);
  }
}