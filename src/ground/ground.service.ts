import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { GroundDTO } from './dto/ground.dto';
import { UpdateGroundDto } from './dto/update-ground.dto';
import * as admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import { VerifyDTO } from './dto/verifyGround.dto';
import axios from 'axios';

@Injectable()
export class GroundService {
  async createGround(groundDTO: GroundDTO): Promise<any> {
    const db = admin.firestore();
    const { sports, city, ownerID, mapAddress } = groundDTO;
    try {
      const groundID = uuid();
      const coordinates = await this.getLatLong(mapAddress);
      await db.doc(`grounds/${sports}`).set(
        {
          [city]: {
            [groundID]: {
              ...groundDTO,
              ...coordinates,
              verified: false,
            },
          },
        },
        { merge: true },
      );
      let paramsString = `${ownerID}.groundID`; // DOT Notation to update nested objects
      const obj = {
        [paramsString]: groundID,
      };
      await db.doc('users/ground-owner').update(obj);
      console.log('Ground created successfully.');
    } catch (error) {
      console.log('Ground failed to create');
    }
  }

  /**
   *
   * @param mapUrl is a map link, either short link or long
   * @returns latitude and longitude of that map
   */
  async getLatLong(mapUrl: string): Promise<any> {
    try {
      var lat = 0.0,
        lon = 0.0;
      if (mapUrl.split('/')[2] === 'www.google.com') {
        var url = mapUrl.split('@');
        var at = url[1].split('z');
        var zero = at[0].split(',');
        lat = parseFloat(zero[0]);
        lon = parseFloat(zero[1]);
      } else if (mapUrl.split('/')[2] === 'goo.gl') {
        //  console.log(Object.values(mapUrl)[0]);
        await axios.get(mapUrl).then((response) => {
          console.log(response.request.path);
          var ll = response.request.path.split('/')[3].split(',');
          lat = parseFloat(ll[0]);
          lon = parseFloat(ll[1]);
        });
      }
      return {
        lat: lat,
        lon: lon,
      };
    } catch (error) {
      console.log(error);
    }
  }

  ////////////
  async groundsAndOwner(req: Request, res: Response): Promise<any> {
    const db = admin.firestore();
    var groundsList = {};
    const groundsRef = db.collection('grounds');

    try {
      groundsRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        /////////////////////This will get every ground of every location////////////////////////////////////////
        const arr = data
          .map(
            (
              ground, //return cities names
            ) =>
              Object.keys(ground)
                .filter((value) => value !== 'id')
                .map((cityName) => {
                  let keys = Object.keys(ground[cityName]);
                  keys.map((key) => {
                    ground[cityName][key]['sports'] = ground.id;
                    ground[cityName][key]['city'] = cityName;
                  });
                  return ground[cityName];
                }),
          )
          .flat(); //flat merges nested arrays into single array
        //  console.log(Object.keys(arr[0])[0]);
        for (let i = 0; i < arr.length; i++) {
          for (const key in arr[i]) {
            Object.assign(groundsList, { [key]: arr[i][key] });
          }
        }

        db.doc('users/ground-owner')
          .get()
          .then(function (response) {
            var tempObj = {};
            var owners = response.data();

            for (const key in groundsList) {
              for (const ownerID in owners) {
                if (groundsList[key].ownerID == ownerID) {
                  Object.assign(tempObj, {
                    [key]: {
                      ...groundsList[key],
                      owner: { ...owners[ownerID] },
                    },
                  });
                }
              }
            }
            console.log(tempObj);
            return res.status(200).json(tempObj);
          });
      });
    } catch (error) {
      return { general: 'Something went wrong, please try again' };
    }
  }

  findAll() {
    return `This action returns all ground`;
  }
  /**
   *
   * @param id of owner
   * @returns owner ground
   */
  async findOne(id: string): Promise<any> {
    var groundsList = {};
    const db = admin.firestore();
    const groundRef = db.collection('grounds');
    try {
      var Found = {};
      //check every document ,every city, with every ground-id, if belongs to ownerid, then return true
      await groundRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const arr = data
          .map(
            (
              ground, //return cities names
            ) =>
              Object.keys(ground)
                .filter((value) => value !== 'id')
                .map((cityName) => {
                  let keys = Object.keys(ground[cityName]);
                  keys.map((key) => {
                    ground[cityName][key]['type'] = ground.id;
                    ground[cityName][key]['city'] = cityName;
                  });
                  return ground[cityName];
                }),
          )
          .flat()
          .flat(); //flat merges nested arrays into single array

        for (let i = 0; i < arr.length; i++) {
          for (const key in arr[i]) {
            Object.assign(groundsList, { [key]: arr[i][key] });
          }
        }

        for (const key in groundsList) {
          if (id === groundsList[key]['ownerID']) {
            //  console.log(groundsList[key]['verified']);
            Object.assign(Found, { [key]: groundsList[key] });
            break;
          }
        }
      });
      console.log(Found);
      return Found;
    } catch (error) {
      console.log('Error ', error);
    }
  }

  async findGrounByID(id: string): Promise<any> {
    var groundsList = {};
    const db = admin.firestore();
    const groundRef = db.collection('grounds');
    try {
      var Found = {};
      //check every document ,every city, with every ground-id, if belongs to ownerid, then return true
      await groundRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const arr = data
          .map(
            (
              ground, //return cities names
            ) =>
              Object.keys(ground)
                .filter((value) => value !== 'id')
                .map((cityName) => {
                  let keys = Object.keys(ground[cityName]);
                  keys.map((key) => {
                    ground[cityName][key]['type'] = ground.id;
                    ground[cityName][key]['city'] = cityName;
                  });
                  return ground[cityName];
                }),
          )
          .flat()
          .flat(); //flat merges nested arrays into single array

        for (let i = 0; i < arr.length; i++) {
          for (const key in arr[i]) {
            Object.assign(groundsList, { [key]: arr[i][key] });
          }
        }

        for (const key in groundsList) {
          if (id === key) {
            //  console.log(groundsList[key]['verified']);
            Object.assign(Found, { [key]: groundsList[key] });
            break;
          }
        }
      });
      console.log(Found);
      return Found;
    } catch (error) {
      console.log('Error ', error);
    }
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
      db.collection('grounds')
        .doc(type)
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
