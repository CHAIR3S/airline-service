import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
    sub: number;
    email: string;
    role: string;
  }


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'), // Extrae refreshToken del body
      ignoreExpiration: false,
    //   secretOrKey: process.env.JWT_REFRESH_SECRET, // Asegúrate de que está definido en .env
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'clave-temporal', // Asegúrate de que está definido en .env
    });
  }

  validate(payload: JwtPayload): { userId: number; email: string; role: string } {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
  
}
