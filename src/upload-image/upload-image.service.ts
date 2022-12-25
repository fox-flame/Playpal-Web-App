import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class UploadImageService {
  constructor(private configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  //read file
  read(file, uploadDTO) {
    const { userID } = uploadDTO;
    var s3 = new AWS.S3();

    var base64data = Buffer.from(file.buffer, 'binary');

    s3.putObject(
      {
        Bucket: 'groundimgs',
        Key: 'owners' + '/' + userID + '/' + file.originalname,
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
  async uploadMultiImg(images, uploadDTO) {
    var numFiles = images.length;

    //Only 3 images are acceptable
    if (numFiles > 0 && numFiles <= 3) {
      // Read in the file, convert it to base64, store to S3
      for (let i = 0; i < numFiles; i++) {
        this.read(images[i], uploadDTO);
      }
    }
  }

  // Coaches files to upload
  coachFiles(file, uploadDTO) {
    //update new coach data to firebase on specific userID.
    const { userID, DOB, experience } = uploadDTO;
    const db = admin.firestore();
    db.collection('users')
      .doc('coaches')
      .update({
        [`${userID}.DOB`]: DOB,
        [`${userID}.experience`]: experience,
        [`${userID}.verified`]:false,
      });

    var s3 = new AWS.S3();

    var base64data = Buffer.from(file.buffer, 'binary');

    s3.putObject(
      {
        Bucket: 'coaches-playpal',
        Key: 'files' + '/' + userID + '/' + file.originalname,
        Body: base64data,
        ACL: 'public-read',
      },
      function (resp) {
        console.log('Response is ', resp);
        console.log('Successfully uploaded, ', file);
      },
    );
  }
  //Upload Coach Files
  async uploadCoachFiles(files, uploadDTO) {
    var numFiles = files.length;

    if (numFiles) {
      // Read in the file, convert it to base64, store to S3

      for (let i = 0; i < numFiles; i++) {
        this.coachFiles(files[i], uploadDTO);
      }
    }
  }

  //get Coach Files
  async getCoachFiles(id: string, res: Response): Promise<any> {
    try {
      var fileURLS = [];
      var s3 = new AWS.S3();
      const params = {
        Bucket: 'coaches-playpal',
        Delimiter: '',
        Prefix: 'files/' + id,
      };
      await s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          for (let content of data.Contents) {
            // console.log(content.Key);
            let params = {
              Bucket: 'coaches',
              Key: content.Key,
              Expires: 10000,
            };
            let url = s3.getSignedUrl('getObject', params);
            fileURLS.push(url.toString());
          }
          res.send(fileURLS);
        }
      });
    } catch (error) {}
  }

  async getGroundImages(id: string, res: Response): Promise<any> {
    try {
      var imgURLS = [];
      var s3 = new AWS.S3();
      const params = {
        Bucket: 'groundimgs',
        Delimiter: '',
        Prefix: 'owners/' + id,
      };
      await s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          for (let content of data.Contents) {
            // console.log(content.Key);
            let params = {
              Bucket: 'groundimgs',
              Key: content.Key,
              Expires: 10000,
            };
            let url = s3.getSignedUrl('getObject', params);
            imgURLS.push(url.toString());
          }
          res.send(imgURLS);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all uploadImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadImage`;
  }
}
