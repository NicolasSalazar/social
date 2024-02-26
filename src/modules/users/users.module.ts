import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ReadEnvService } from 'src/shared/configs/read.env.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService, ReadEnvService],
  exports: [UsersService]
})
export class UsersModule {}
