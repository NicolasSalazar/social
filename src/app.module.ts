import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReadEnvService } from './shared/configs/read.env.service';
import { ConfigsModule } from './shared/configs/configs.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { PostsModule } from './modules/posts/posts.module';
import { EnvKeys } from './shared/configs/env.keys';
import { EmailService } from './shared/email/email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  imports: [ 
    MailerModule.forRootAsync({
      imports: [ConfigsModule],
      inject: [ReadEnvService],
      useFactory(readEnv: ReadEnvService) {
        return {
          transport: {
            service: 'Mailjet',
            auth: {
              user: readEnv.getEnv(EnvKeys.apiKeyMail),
              pass: readEnv.getEnv(EnvKeys.apiSecretKeyMail),
            },
          },
          defaults: {
            from: 'nicolassalazar2015327@gmail.com',
          },
        }
      },
    }),
    AuthModule, UsersModule, ConfigsModule, PrismaModule, PostsModule ],
  providers: [ReadEnvService, EmailService],
})
export class AppModule {
  static port: number | string; // SE DECLARA LA VARIABLE DEL PUERTO POR EL CUAL EL PROYECTO VA A CORRER

  constructor(
    private readonly readEnvService: ReadEnvService
  ){
    AppModule.port = this.readEnvService.getEnv(EnvKeys.port);
  }
}


