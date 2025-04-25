import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { HashModule } from 'src/shared/hash/hash.module';

@Module({
  imports: [
    UserModule,
    HashModule,
    ConfigModule.forRoot({
      isGlobal: true, // accesible en toda la app sin volver a importar
    }),
    PassportModule,
    JwtModule.register({
      // secret: 'clave-ultrasecreta-access',
      secret: process.env.JWT_ACCESS_SECRET || 'clave-temporal',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
