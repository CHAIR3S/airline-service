import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from './position/position.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d03gob3uibrs73a8qe90-a.oregon-postgres.render.com',
      port: 5432,
      username: 'airline_guhi_user',
      password: 'EpGxyT7WdZs3EVGis0RkclAB5VHd4DAD',
      database: 'airline_guhi',
      schema: 'public',
      autoLoadEntities: true,
      // synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, // Solo en desarrollo false
        },
      },
    }),
    UserModule,
    PositionModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
