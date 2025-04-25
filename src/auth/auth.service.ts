import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { HashService } from '../shared/hash/hash.service';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await this.hashService.comparePassword(password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }

  login(user: User) {
    const payload = { sub: user.userId , email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  refresh(token: string) {
    try {

      console.log('Payload:', process.env.JWT_ACCESS_SECRET || 'clave-temporal'); // Verifica el payload aquí
      
      const payload: JwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET || 'clave-temporal',
        // secret: process.env.JWT_REFRESH_SECRET,
      });


      const newAccessToken = this.jwtService.sign({
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      }, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      });
      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido', err);
    }
  }
}