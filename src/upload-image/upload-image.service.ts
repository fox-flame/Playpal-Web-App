import { S3Client } from '@aws-sdk/client-s3';
import * as AWS from 'aws-sdk';
import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { UpdateUploadImageDto } from './dto/update-upload-image.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadImageService {
  // s3 = new S3Client({
  //   region: process.env.AWS_REGION as string,
  //   credentials: {
  //     accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
  //     secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  //   },
  // });
  constructor(private configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  //read file
  read(file) {
    var s3 = new AWS.S3();

    var base64data = Buffer.from(file.buffer, 'binary');

    s3.putObject(
      {
        Bucket: 'groundimgs',
        Key: 'owners' + '/' + file.originalname,
        Body: base64data,
        ACL: 'public-read',
      },
      function (resp) {
        console.log('Response is ', resp);
        console.log('Successfully uploaded, ', file);
      },
    );
  }

  //Upload multiple images
  async uploadMultiImg(images) {
    console.log('These are the files you have', images);
    var numFiles = images.length;

    if (numFiles) {
      // Read in the file, convert it to base64, store to S3

      for (let i = 0; i < numFiles; i++) {
        this.read(images[i]);
      }
    }
  }

  findAll() {
    return `This action returns all uploadImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadImage`;
  }

  update(id: number, updateUploadImageDto: UpdateUploadImageDto) {
    return `This action updates a #${id} uploadImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadImage`;
  }
}
function cancelMultipartUpload(initParams: any) {
  throw new Error('Function not implemented.');
}
