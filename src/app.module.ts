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
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(), //para los events de la app
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({  //para mostrar el static resource en caso de apuntar a localhost:3030/
      rootPath: join(__dirname, '..', 'client')
    }),
    MongooseModule.forRoot(process.env.DB_URI, { 
      connectionFactory: (connection) => {     //para el soft-delete de modelos de manera global
        const pluginsOptions = { overrideMethods: 'all' } //no retorna los eliminadoss
        connection.plugin(require('mongoose-delete'), pluginsOptions);
        return connection;
      }
    }),
    CoursesModule, 
    AuthModule, 
    VideosModule, 
    AwardsModule, 
    UsersModule, 
    EventMailModule, 
    MailModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
