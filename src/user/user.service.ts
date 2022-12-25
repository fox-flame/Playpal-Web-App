import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as admin from 'firebase-admin';
import { GetUserDto } from './dto/get-user-dto';
import { VerifyCoachDTO } from './dto/verify-coach-DTO';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { userID, role, displayName, phoneNumber } = createUserDto;
      const db = admin.firestore();
      //if user already exists, just update name and exit.
      db.collection('users')
        .doc(role)
        .get()
        .then((snapshot) => {
          if (Object.keys(snapshot.data()).includes(userID)) {
            db.collection('users')
              .doc(role)
              .update({
                [`${userID}.displayName`]: displayName,
              });
            return;
          }
        });
      // if user don't exists, create it
      db.collection('users')
        .doc(role)
        .set(
          {
            [userID]: {
              displayName: displayName,
              phoneNumber: phoneNumber,
            },
          },
          { merge: true },
        );
    } catch (error) {
      console.log('error creating user');
      return error;
    }
  }
  /**
   *
   * @param id of coach
   * @returns status of a coach
   */
  async isCoachVerified(id: string): Promise<any> {
    try {
      const db = admin.firestore();
      var b;
      await db
        .collection('users')
        .doc('coaches')
        .get()
        .then((coach) => {
          if (Object.keys(coach.data()).includes(id)) {
            if (!Object.keys(coach.data()[id]).includes('verified')) {
              b = 'not-a-coach';
            } else {
              b = coach.data()[id]['verified'];
            }
          }
        });
      return b;
    } catch (error) {
      return error;
    }
  }

  async markAsVerified(verifyDTO: VerifyCoachDTO): Promise<any> {
    try {
      const { id } = verifyDTO;
      const db = admin.firestore();
      db.collection('users')
        .doc('coaches')
        .update({
          [`${id}.verified`]: true,
        });
    } catch (error) {
      console.log('Error verifying coach', error);
      return error;
    }
  }

  /**
   *
   * @returns list of coaches that are not verified
   */
  async getCoaches(): Promise<any> {
    try {
      var coaches = [];
      const db = admin.firestore();
      await db
        .collection('users')
        .doc('coaches')
        .get()
        .then((coach) => {
          for (const [key, value] of Object.entries(coach.data())) {
            if (value['verified'] === false) {
              coaches.push({ ...value });
            }
          }
        });
      return coaches;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async getUserByRoleAndId(user: GetUserDto): Promise<any> {
    try {
      const db = admin.firestore();
      let userObj = {};
      await db
        .collection('users')
        .doc(user.role)
        .get()
        .then((res) => {
          Object.assign(userObj, res.data()[user.userID]);
        });
      return userObj;
    } catch (error) {
      console.log(error);
      return JSON.stringify(error);
    }
  }

  /**
   *
   * @param id
   * @returns user with that id
   */
  async findUserByID(id: string): Promise<any> {
    //    .where('Document ID', 'in', ['coaches', 'player'])
    try {
      const db = admin.firestore();
      let user = {};
      await db
        .collection('users')
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => {
            for (const key in doc.data()) {
              if (id === key) {
                user = doc.data()[key];
                user['role'] = doc.id;
                break;
              }
            }
          }),
        );
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
