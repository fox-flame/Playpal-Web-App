import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import * as admin from 'firebase-admin';
import { BookGroundDTO } from './dto/book-ground-dto';
import { UserService } from 'src/user/user.service';
import { SlotDTO } from './dto/slot-dto';

@Injectable()
export class BookingService {
  constructor(private userService: UserService) {}

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
      //check before if slot is booked
      //if in that date, user is there, check his slots, add new slot in bookedslot
      await db
        .collection('bookings')
        .doc('6idYckzA4ZSAPld1hWsi')
        .get()
        .then(async (snapshot) => {
          var grounds = snapshot.data();
          for (const [gid, allDates] of Object.entries(grounds)) {
            if (gid === groundID) {
              console.log('ground id matched');
              for (const [date, users] of Object.entries(allDates)) {
                if (date !== 'slots' && dates.includes(date)) {
                  //check if in date, user exists
                  if (Object.keys(grounds[gid][date]).includes(userID)) {
                    //now merge selected slot for user
                    const params = `${gid}.${date}.${userID}.bookedSlotID`;

                    await db
                      .collection('bookings')
                      .doc('6idYckzA4ZSAPld1hWsi')
                      .update({
                        [params]:
                          admin.firestore.FieldValue.arrayUnion(bookedSlot),
                      });
                    break;
                  }
                  //if user not exists,create user and add in date
                  else {
                    await db
                      .collection('bookings')
                      .doc('6idYckzA4ZSAPld1hWsi')
                      .set(
                        {
                          [gid]: {
                            [date]: {
                              [userID]: {
                                bookedSlotID: [bookedSlot],
                                bookedAt: new Date(),
                              },
                            },
                          },
                        },
                        { merge: true },
                      );
                    break;
                  }
                } //if date is not even created
                else {
                  console.log('no date present');
                  dates.forEach(async (newDate) => {
                    console.log(newDate);
                    if (
                      Object.entries(allDates).find(
                        (d) => d.toString() !== newDate,
                      )
                    ) {
                      await db
                        .collection('bookings')
                        .doc('6idYckzA4ZSAPld1hWsi')
                        .set(
                          {
                            [gid]: {
                              [newDate]: {
                                [userID]: {
                                  bookedSlotID: [bookedSlot],
                                  bookedAt: new Date(),
                                },
                              },
                            },
                          },
                          { merge: true },
                        );
                    }
                  });
                  break;
                }
              }
            }
          }
        });

      //dd-mm-yy objects, user can select multiple dates []
      // //iterate from dates array and create objects
      // for (const ddmmyyyy of dates) {
      //   await db
      //     .collection('bookings')
      //     .doc('6idYckzA4ZSAPld1hWsi')
      //     .set(
      //       {
      //         [groundID]: {
      //           [ddmmyyyy]: {
      //             [userID]: {
      //               bookedSlotID: bookedSlot,
      //               bookedAt: new Date(),
      //             },
      //           },
      //         },
      //       },
      //       { merge: true },
      //     );
      // }
    } catch (error) {
      console.log('Error booking ground ', error);
    }
  }

  /**
   *
   * @param id of ground
   * @returns all bookings of that ground
   */
  async findAll(id: string): Promise<any> {
    try {
      const db = admin.firestore();
      let users = [];
      return await db
        .collection('bookings')
        .doc('6idYckzA4ZSAPld1hWsi')
        .get()
        .then(async (snapshot) => {
          var g = snapshot.data()[id];
          let keys = Object.keys(g).filter((k) => k !== 'slots'); //all dates objects with users

          for (let i = 0; i < keys.length; i++) {
            let bookingSlot = g[keys[i]];
            let userObj = {};

            for (const [userID, value] of Object.entries(bookingSlot)) {
              //fetch users data by id
              let user = await this.userService.findUserByID(userID);
              //Add data in userObj with keys[i] which is date
              if (Object.keys(user).length > 0) {
                //key-value pair
                userObj[keys[i]] = {
                  [userID.toString()]: {
                    ...user,
                    bookedSlotID: value['bookedSlotID'],
                  },
                };
              }
            }
            //after adding all users in respective dates, push into array
            users.push(userObj);
          }
          return users;
        });
    } catch (error) {
      console.log('Error finding bookings ', error);
    }
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
  /**
   *
   * @param slotsDTO - having ground id and date
   * @returns check slots on respective date.
   */
  async findAvailableSlots(slotsDTO: SlotDTO): Promise<any> {
    try {
      const db = admin.firestore();
      const bookedSlots = [];
      const { date, groundID } = slotsDTO;

      await db
        .collection('bookings')
        .doc('6idYckzA4ZSAPld1hWsi')
        .get()
        .then((snapshot) => {
          for (const [key, value] of Object.entries(snapshot.data())) {
            //  console.log(key); //ground id
            for (const [key1, value1] of Object.entries(value)) {
              if (key1 !== 'slots' && key1 === date) {
                for (const [key2, value2] of Object.entries(value[key1])) {
                  console.log(key2);
                  bookedSlots.push(value2['bookedSlotID']);
                }
                // bookedSlots.push(...value2['bookedSlotID']);
                break;
              }
            }
          }
        });
      console.log(bookedSlots);
    } catch (error) {
      console.log('Error booking slots ', error);
    }
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
