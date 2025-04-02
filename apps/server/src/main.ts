import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { initializeTracing } from "./tracing";
import helmet from "helmet";

async function bootstrap() {
  if (process.env.TELEMETRY_ENDPOINT) {
    initializeTracing();
  }

  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  const config = new DocumentBuilder()
    .setTitle("Arcana Pixel API")
    .setDescription("Description of Arcana Pixel main API")
    .setVersion(process.env.npm_package_version ?? "1.0.0")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, documentFactory);

  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
