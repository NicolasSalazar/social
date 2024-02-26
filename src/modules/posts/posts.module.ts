import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ReadEnvService } from 'src/shared/configs/read.env.service';

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService, JwtService, ReadEnvService],
})
export class PostsModule {}
