import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/media.handle';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { AllowedRoles } from 'src/decorators/allowed-roles.decorator';

@ApiTags('videos')
//@UseInterceptors(LoggerInterceptor)
@UseGuards(JwtGuardGuard, RolesGuard)
@Controller('videos')
export class VideosController {

  constructor(private readonly videosService: VideosService) {}

  @Post() 
  @AllowedRoles('admin')
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Post('upload/:id') 
  @AllowedRoles('admin')
  @UseInterceptors(FileInterceptor('my-file', { storage }))
  upload(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.videosService.addVideo(id, file.filename)
  } 

  @Get()
  @AllowedRoles('admin', 'user', 'manager')
  findAll() { 
    return this.videosService.findAll();
  }

  @Get(':id')
  @AllowedRoles('admin', 'user', 'manager')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }

  // @Get()
  // @AllowedRoles('admin', 'user', 'manager')
  // findAll(@Query('description') query: string) { //TODO: http://localhost:3000/videos?id=6&descripcion=holalauti
  //   // console.log(query)

  //   return this.videosService.findAll();
  // }

}
