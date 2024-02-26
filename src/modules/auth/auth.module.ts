import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ReadEnvService } from 'src/shared/configs/read.env.service';
import { ConfigsModule } from 'src/shared/configs/configs.module';
import { EnvKeys } from 'src/shared/configs/env.keys';
import { EmailService } from 'src/shared/email/email.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigsModule],
      inject: [ReadEnvService],
      useFactory(readEnv: ReadEnvService) {
        return {
          secret: readEnv.getEnv(EnvKeys.secretStringJwt),
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
    UsersModule, AuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService, ReadEnvService, EmailService]
})
export class AuthModule {}
