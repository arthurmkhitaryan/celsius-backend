import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Specify the client application URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Increase payload size limits
  app.use(bodyParser.json({ limit: '50mb' })); // Set JSON payload size limit
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Set URL-encoded form data size limit

  // Start the application
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
