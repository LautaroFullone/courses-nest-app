import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './model/courses.schema';
import { User, UserSchema } from 'src/users/model/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Course.name, schema: CourseSchema },
        { name: User.name, schema: UserSchema }
      ]
    ),
    // MongooseModule.forFeatureAsync(  //para el soft delete a nivel de model
    //   [
    //     {
    //       name: Course.name,
    //       useFactory: () => {
    //         const schema = CourseSchema
    //         const pluginsOptions = { overrideMethods: 'all'}

    //         schema.plugin(require('mongoose-delete'), pluginsOptions)

    //         return schema;
    //       }
    //     }
    //   ]
    // )
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}
