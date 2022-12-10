import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { UpdateUploadImageDto } from './dto/update-upload-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import path from 'path';

@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('grounds[]', 10))
  upload(@UploadedFiles() files) {
    console.log('My images are ', files);
    return this.uploadImageService.uploadMultiImg(files);
  }

  @Get()
  findAll() {
    return this.uploadImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadImageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUploadImageDto: UpdateUploadImageDto,
  ) {
    return this.uploadImageService.update(+id, updateUploadImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadImageService.remove(+id);
  }
}
