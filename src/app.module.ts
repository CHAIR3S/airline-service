import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from './position/position.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeePayrollModule } from './employee-payroll/employee-payroll.module';
import { AircraftModule } from './aircraft/aircraft.module';
import { FlightModule } from './flight/flight.module';
import { FlightEmployeeModule } from './flight-employee/flight-employee.module';
import { EmployeeShiftModule } from './employee-shift/employee-shift.module';
import { ClientModule } from './client/client.module';
import { SeatModule } from './seat/seat.module';
import { ReservationModule } from './reservation/reservation.module';
import { TicketModule } from './ticket/ticket.module';
import { PaymentModule } from './payment/payment.module';
import { BaggageModule } from './baggage/baggage.module';
import { CheckinModule } from './checkin/checkin.module';
import { RefundRequestModule } from './refund-request/refund-request.module';
import { AuthModule } from './auth/auth.module';
import { TrackingModule } from './tracking/tracking.module';
import { PlaceModule } from './place/place.module';

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
    EmployeePayrollModule,
    AircraftModule,
    FlightModule,
    FlightEmployeeModule,
    EmployeeShiftModule,
    ClientModule,
    SeatModule,
    ReservationModule,
    TicketModule,
    PaymentModule,
    BaggageModule,
    CheckinModule,
    RefundRequestModule,
    AuthModule,
    TrackingModule,
    PlaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
