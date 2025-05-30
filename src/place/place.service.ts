import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

// src/place/dto/place-response.dto.ts
import { WeatherType } from './entities/place.entity';

export class PlaceResponseDto {
  placeId: number;
  name: string;
  city?: string;
  country?: string;
  weather?: WeatherType;
  terminal?: string;
  discount?: number;
  latitude: number;
  longitude: number;
  photo: string | null;
}


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
    return this.placeRepository.find().then((places) =>
      places.map((place) => ({
        ...place,
        photo: place.photo ? Buffer.from(place.photo).toString('base64') : null,
      })),
    );
  }

  findOne(id: number) {
    return this.placeRepository.findOneBy({ placeId: id }).then((place) =>
      place
        ? {
            ...place,
            photo: place.photo
              ? Buffer.from(place.photo).toString('base64')
              : null,
          }
        : null,
    );
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


  async findNearestPlace(lat: number, lng: number): Promise<Place> {
    console.log('lat', lat);
    console.log('lng', lng);

    const places = await this.placeRepository.find();

    if (!places.length) throw new Error('No hay lugares registrados');

    const toRad = (value: number) => (value * Math.PI) / 180;

    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    return places.reduce((nearest, current) => {
      const currentDist = getDistance(lat, lng, current.latitude, current.longitude);
      const nearestDist = getDistance(lat, lng, nearest.latitude, nearest.longitude);
      return currentDist < nearestDist ? current : nearest;
    });
  }


  async findWithDiscount(): Promise<PlaceResponseDto[]> {
    const places = await this.placeRepository.find({
      where: {
        discount: MoreThan(0),
      },
    });

    return places.map((place) => ({
      ...place,
      photo: place.photo ? Buffer.from(place.photo).toString('base64') : null,
    }));
  }

}
