import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/utils/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/media.handle';

@ApiTags('videos')
@UseInterceptors(LoggerInterceptor)
@Controller('videos')
//TODO: @UsePipes(new ValidationPipe())
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log('create body: ',createVideoDto)
    return this.videosService.create(createVideoDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('my-file', { storage }))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log('file: ', file)
  } 

  @Get()
  findAll(@Query('description') query: string) { //TODO: http://localhost:3000/videos?id=6&descripcion=holalauti
    // console.log(query)

    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // console.log(id)
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
