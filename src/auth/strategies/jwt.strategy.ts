import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
    sub: number;      // ID del usuario
    email: string;
    role: string;
  }


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    //   secretOrKey: process.env.JWT_ACCESS_SECRET,
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'clave-temporal', // debe de que estar definido en .env
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
