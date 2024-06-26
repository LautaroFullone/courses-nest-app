import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException, ParseIntPipe, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { SlugPipe } from './pipes/slug/slug.pipe';
import { BrowserAgentGuard } from 'src/guards/browser-agent/browser-agent.guard';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { AllowedRoles } from 'src/decorators/allowed-roles.decorator';

@ApiTags('courses') //swagger groups
@UseGuards(BrowserAgentGuard, JwtGuardGuard, RolesGuard)
@Controller('courses')
export class CoursesController {
  
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(221)
  @AllowedRoles('admin')   //@SetMetadata('allowed-roles', 'admin') //esto es lo mismo sin usar el custom decorator
  create(@Body() create: CreateCourseDto) {

    const {price} = create;
    
    if(price===999)
      throw new HttpException('El precio es demasiado alto', HttpStatus.FORBIDDEN)
     
    return this.coursesService.create(create)
  }

  @Get(':id') @HttpCode(200)
  @AllowedRoles('admin', 'user', 'manager') 
  getDetail(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id') @HttpCode(200)
  @AllowedRoles('admin', 'user', 'manager')
  updateCourse(@Param('id') id: string, @Body() updateCourse: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourse);
  }

  // @Get(':title') @HttpCode(200)
  // //no pongo @AllowedRoles porque cualquiera puede hacer un get
  // getDetail(@Param('title', new SlugPipe()) title: string) {
  //   console.log('title: ', title)
  //   return this.coursesService.findOne(1);
  // }

  @Get('') @HttpCode(200)
  @AllowedRoles('admin', 'user', 'manager')   
  getListCourses() {
    return this.coursesService.findAll();
  }

  @Delete(':id') @HttpCode(200)
  @AllowedRoles('admin', 'user', 'manager')
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  // @Get(':id')
  // getDetail(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id:number){
  //   console.log('id: ',id)
  //   return this.coursesService.findOne(id);
  // }

  // @Post()
  // create(@Body() createCourseDto: CreateCourseDto) {
  //   console.log('__CURRENCY__', process.env.CURRENCY)
  //   return this.coursesService.create(createCourseDto);
  // }

  // @Get() 
  // findAll() {
  //   return this.coursesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coursesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
  //   return this.coursesService.update(+id, updateCourseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coursesService.remove(+id);
  // }
}
