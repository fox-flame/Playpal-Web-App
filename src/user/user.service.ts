import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as admin from 'firebase-admin';
import { GetUserDto } from './dto/get-user-dto';
import { VerifyCoachDTO } from './dto/verify-coach-DTO';
import { HireCoachDTO } from './dto/hire-coach.dto';

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
              coaches.push({ id: key, ...value });
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

  async hireCoach(hireCoachDto: HireCoachDTO): Promise<any> {
    try {
      const { coachID, playerID } = hireCoachDto;
      const db = admin.firestore();

      await db
        .collection('users')
        .doc('player')
        .update({
          [`${playerID}.myCoaches`]: {
            [coachID]: 'coach',
          },
        });

      await db
        .collection('users')
        .doc('coaches')
        .update({
          [`${coachID}.myStudents`]: {
            [playerID]: 'player',
          },
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  /**
   *
   * @param id  of player
   */
  async getMyCoach(id: string): Promise<any> {
    try {
      const db = admin.firestore();

      let myCoach = {};

      await db
        .collection('users')
        .doc('player')
        .get()
        .then(async (player) => {
          for (const [playerID, value] of Object.entries(player.data())) {
            if (playerID === id) {
              for (const [coachid, value1] of Object.entries(
                value['myCoaches'],
              )) {
                //name,experience,age of coach
                await db
                  .collection('users')
                  .doc('coaches')
                  .get()
                  .then((coach) => {
                    for (const [coachKey, coachValue] of Object.entries(
                      coach.data(),
                    )) {
                      if (coachid === coachKey) {
                        Object.assign(myCoach, coachValue);
                        break;
                      }
                    }
                  });
              }
              break;
            }
          }
        });
      return myCoach;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
/**
 * 
 * @param id of coach
 * @returns students list
 */
  async getMyStudents(id: string): Promise<any> {
    try {
      const db = admin.firestore();
      let myStudents = [];
      await db
        .collection('users')
        .doc('coaches')
        .get()
        .then(async (coach) => {
          for (const [coachID, value] of Object.entries(coach.data())) {
            //coachID
            if (coachID === id) {
              for (const [playerID, player] of Object.entries(
                value['myStudents'],
              )) {
                await db
                  .collection('users')
                  .doc('player')
                  .get()
                  .then((p) => {
                    for (const [pid, data] of Object.entries(p.data())) {
                      if (playerID === pid) {
                        // console.log(pid);
                        myStudents.push({
                          studentID: playerID,
                          phoneNumber: data['phoneNumber'],
                          displayName: data['displayName'],
                        });
                      }
                    }
                  });
              }
              break;
            }
          }
        });
      return myStudents;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
