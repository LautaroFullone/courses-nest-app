import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './model/courses.schema';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';

interface ModelExt<T> extends Model<T>{
  delete: Function;
  findAllCourses: Function
}

@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private readonly courseModel: ModelExt<CourseDocument>,
              @InjectModel(User.name) private readonly userModule: ModelExt<UserDocument>) { }

  create(createCourseDto: CreateCourseDto) {
    const user = this.userModule.find();
    return this.courseModel.create(createCourseDto); 
  }

  findAll() {
    return this.courseModel.findAllCourses();
  }

  async findOne(id: string) {
    return this.courseModel.findOne({id})
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findOneAndUpdate({ id }, updateCourseDto, 
      { 
        upsert: true, //si no existe, lo crea
        new: true //retorna el documento editado (el new)
      })
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id)
    const response = this.courseModel.delete({_id})
    return response;
  }
}
