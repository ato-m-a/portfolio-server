import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('홍준혁 API Docs')
    .setDescription('API 명세')
    .setVersion('1.0.0')
    .build();

  const options: SwaggerDocumentOptions = {
    include: [],
    deepScanRoutes: true
  };

  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: '홍준혁',
    swaggerOptions: {
      defaultModelsExpandDepth: -1
    }
  };

  SwaggerModule.setup('api/v1/docs', app, document, customOptions);
};

export default setupSwagger;