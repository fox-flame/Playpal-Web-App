import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as admin from 'firebase-admin';
import { GetUserDto } from './dto/get-user-dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async getUserByRoleAndId(user: GetUserDto): Promise<any> {
    try {
      const db = admin.firestore();
      await db
        .collection('users')
        .doc(user.role)
        .get()
        .then((res) => {
          const data = Object.entries(res.data());
          for (const d of data) {
          }
        });
    } catch (error) {}
  }
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
              for (const userID in doc.data()[key]) {
                if (id === userID) {
                  user = doc.data()[key][id];
                  break;
                }
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
