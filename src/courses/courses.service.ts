import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './model/courses.scheme';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';

interface ModelExt<T> extends Model<T>{
  delete: Function
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
    const coursesList = this.courseModel.find()
    return coursesList;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id)
    const response = this.courseModel.delete({_id})
    return response;
  }
}
