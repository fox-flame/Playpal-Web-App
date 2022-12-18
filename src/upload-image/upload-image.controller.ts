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
  Res,
} from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { uploadDTO } from './dto/upload.dto';
import { Response } from 'express';

@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('grounds[]', 3))
  async upload(@UploadedFiles() files, @Body() uploadDTO: uploadDTO) {
    return await this.uploadImageService.uploadMultiImg(files, uploadDTO);
  }

  @Post('/coach')
  @UseInterceptors(FilesInterceptor('files[]', 2))
  async uploadFiles(@UploadedFiles() files, @Body() uploadDTO: uploadDTO) {
    return await this.uploadImageService.uploadCoachFiles(files, uploadDTO);
  }
  @Get('/coach/:id')
  async findFilesOfOwnerById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    return await this.uploadImageService.getCoachFiles(id, res);
  }

  @Get()
  findAll() {
    return this.uploadImageService.findAll();
  }
  @Get('groundImgs/:id')
  async findGroundImagesByOwnerId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    return await this.uploadImageService.getGroundImages(id, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadImageService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadImageService.remove(+id);
  }
}
