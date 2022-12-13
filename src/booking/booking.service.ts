import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import * as admin from 'firebase-admin';
import { BookGroundDTO } from './dto/book-ground-dto';

@Injectable()
export class BookingService {
  async create(createBookingDto: CreateBookingDto): Promise<any> {
    const { groundID, start1, close1, start2, close2 } = createBookingDto;

    try {
      const db = admin.firestore();
      await db
        .collection('bookings')
        .doc('6idYckzA4ZSAPld1hWsi')
        .set(
          {
            [groundID]: {
              ['slots']: {
                ['slot1']: {
                  startTime: start1,
                  closeTime: close1,
                },
                ['slot2']: {
                  startTime: start2,
                  closeTime: close2,
                },
                ['fullDay']: 'Full Day',
              },
            },
          },
          { merge: true },
        )
        .then((res) => JSON.stringify('{isCreated:true}'));
    } catch (error) {}
  }

  /*
Book a ground
*/
  async bookAGround(bookGroundDto: BookGroundDTO): Promise<any> {
    try {
      const { bookedSlot, groundID, userID, dates } = bookGroundDto;
      const db = admin.firestore();

      //dd-mm-yy objects, user can select multiple dates []
      //iterate from dates array and create objects
      for (const ddmmyyyy of dates) {
        await db
          .collection('bookings')
          .doc('6idYckzA4ZSAPld1hWsi')
          .set(
            {
              [groundID]: {
                [ddmmyyyy]: {
                  [userID]: {
                    bookedSlotID: bookedSlot,
                    bookedAt: new Date(),
                  },
                },
              },
            },
            { merge: true },
          );
      }
    } catch (error) {
      console.log('Error booking ground ', error);
    }
  }

  async findAll(): Promise<any> {
    return `This action returns all booking`;
  }

  // To find ground in bookings by id
  async findOne(id: string): Promise<Boolean> {
    try {
      const db = admin.firestore();
      var flag = false;
      await db
        .collection('bookings')
        .get()
        .then((snapshot) => {
          for (const doc of snapshot.docs) {
            let key = Object.keys(doc.data());
            for (let i = 0; i < key.length; i++) {
              if (key[i] === id) {
                flag = true;
                break;
              }
            }
          }
        });
      return flag;
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
