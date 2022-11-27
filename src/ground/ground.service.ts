import { Injectable } from '@nestjs/common';
import { GroundDTO } from './dto/ground.dto';
import { UpdateGroundDto } from './dto/update-ground.dto';
import * as admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import { VerifyDTO } from './dto/verifyGround.dto';
import { response } from 'express';

@Injectable()
export class GroundService {
  async createGround(groundDTO: GroundDTO) {
    const db = admin.firestore();
    const { name, location, price, sportsType, city } = groundDTO;
    try {
      const groundID = uuid();
      db.doc(`Grounds/${sportsType}`).set(
        {
          [city]: {
            [groundID]: {
              ...groundDTO,
            },
          },
        },
        { merge: true },
      );
      return {
        status: 'Ground created successfully',
      };
    } catch (error) {
      return {
        error: "Can't create ground",
      };
    }
  }

  findAll() {
    return `This action returns all ground`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ground`;
  }

  update(id: number, updateGroundDto: UpdateGroundDto) {
    return `This action updates a #${id} ground`;
  }

  remove(id: number) {
    return `This action removes a #${id} ground`;
  }

  async markAsVerified(verifyDTO: VerifyDTO): Promise<any> {
    const db = admin.firestore();
    const { id, type, city } = verifyDTO;

    try {
      let paramsString = `${city}.${id}.verified`; // DOT Notation to update nested objects
      const obj = {
        [paramsString]: true,
      };
      db.doc(`grounds/${type}`)
        .update(obj)
        .then(() => {
          return JSON.stringify('{verified:true}');
        })
        .catch((error) => console.error('Error: ', error));
    } catch (error) {
      return {
        error: "Can't Verify ground",
        verified: false,
      };
    }
  }
}
