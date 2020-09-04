import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await initializeApiDocs(app);
  await intializeMiddlewares(app);
  await intializeSecurity(app);
  await app.listen(3000);
}
bootstrap();

const initializeApiDocs = async (app: any) => {
  const options = new DocumentBuilder()
    .setTitle('Nest Js Boiler Plate')
    .setDescription('The Products API description')
    .setVersion('1.0')
    .addTag('Products')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

const intializeMiddlewares = async (app: any) => {
  app.use(compression());
};
const intializeSecurity = async (app: any) => {
  app.use(helmet());
  app.enableCors();
};
