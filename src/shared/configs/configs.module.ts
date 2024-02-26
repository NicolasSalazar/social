import { Module } from '@nestjs/common';
import { ReadEnvService } from './read.env.service';

@Module({
  providers: [ ReadEnvService],
  exports: [ ReadEnvService ]
})
export class ConfigsModule {}
