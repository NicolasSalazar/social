import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  requestError(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new BadRequestException(`There is a unique constraint violation, a new register cannot be created with this ${e.meta.target}`)
      }
    }
    throw e
  }
}
