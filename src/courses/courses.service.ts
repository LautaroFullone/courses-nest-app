import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './model/courses.scheme';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';

@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
              @InjectModel(User.name) private readonly userModule: Model<UserDocument>) { }

  
  create(createCourseDto: CreateCourseDto) {
    const user = this.userModule.find();
    return this.courseModel.create(createCourseDto);
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
