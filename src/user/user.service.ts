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
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
