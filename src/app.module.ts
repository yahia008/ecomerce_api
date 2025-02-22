import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthmoduleModule } from './authmodule/authmodule.module';
import {MongooseModule} from '@nestjs/mongoose';
import {MailerModule} from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),
    AuthmoduleModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is available
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('HOST'),
          port: configService.get<number>('SMALL_PORT'),
          secure: true,
          auth: {
            user: configService.get<string>('USER'),
            pass: configService.get<string>('PASS'),
          },
        },
      }),
      inject: [ConfigService], // Inject ConfigService
    } as any),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
