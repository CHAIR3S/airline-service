import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { RolGuard } from './auth/guards/rol.guard';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalPipes(new ValidationPipe());


  const config = new DocumentBuilder()
  .setTitle('Airline API')
  .setDescription('API documentation for the Airline Management System')
  .setVersion('1.0')
  .build();
  
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());



  const securityEnabled = configService.get<string>('SECURITY_ENABLED') === 'true';


  if (securityEnabled) {
    app.useGlobalGuards(
      new JwtAuthGuard(reflector),
      new RolGuard(reflector),
    );
    console.log('🔒 Seguridad habilitada');
  } else {
    console.warn('⚠️ Seguridad deshabilitada (modo desarrollo)');
  }

  
  app.enableCors(); 

  app.useWebSocketAdapter(new IoAdapter(app));



  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
