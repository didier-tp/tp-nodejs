import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
//import { AllExceptionsFilter } from './common/error.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('bank-api');
  app.enableCors();

  /*
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  */
 
  app.useGlobalPipes(new ValidationPipe()); //to validate input with @Is...() from class-validator in DTO class , plain object
  //app.useGlobalPipes(new ValidationPipe({transform:true})); to validate and transform json input as Dto instance
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('bank api')
    .setDescription('Simple bank rest api')
    .setVersion('1.0')
    .addTag('bank')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('bank-api/api', app, document); //http://localhost:3000/bank-api/api



  await app.listen(process.env.PORT ?? 3000);
  //http://localhost:3000/bank-api avec AppController et AppService 
  //http://localhost:3000 ou http://localhost:3000/index.html avec ServeStaticModule
}
bootstrap();
