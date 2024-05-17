import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { AwardsModule } from './awards/awards.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventMailModule } from './event-mail/event-mail.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CoursesModule, 
    AuthModule, 
    VideosModule, 
    AwardsModule, UsersModule, EventMailModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
