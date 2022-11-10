import fs from 'fs';
import { NestFactory } from "@nestjs/core";
import { INestApplication } from '@nestjs/common';

import ServerConfig from "../../../config/ServerConfig";
import { HttpModule } from './http.module';
import { ClassValidatorPipe } from './pipes/class-validator.pipe';

async function bootstrap(): Promise<INestApplication> {
  let nestOptions = {};
  if (ServerConfig.httpsEnabled) {
    nestOptions = {
      httpsOptions: {
        key: fs.readFileSync(ServerConfig.sslKeyPath),
        cert: fs.readFileSync(ServerConfig.sslCertificatePath),
      }
    };
  }

  return NestFactory
    .create(HttpModule, nestOptions)
    .then((nestApp: INestApplication) => {
      nestApp
        .useGlobalPipes(new ClassValidatorPipe())
        .listen(ServerConfig.port);
      return nestApp;
    });
}

export default bootstrap;