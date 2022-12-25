import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import * as admin from 'firebase-admin';
import { BookGroundDTO } from './dto/book-ground-dto';
import { UserService } from 'src/user/user.service';
import { SlotDTO } from './dto/slot-dto';
import { MyBookingsDTO } from './dto/myBookings-dto';
import { GroundService } from 'src/ground/ground.service';
@Injectable()
export class BookingService {
  constructor(
    private userService: UserService,
    private groundService: GroundService,
  ) {}

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
  /**
   *
   * @param bookGroundDto
   */
  async getMyBookings(myBookingsDTO: MyBookingsDTO): Promise<any> {
    try {
      const { userID } = myBookingsDTO;
      var myBookings = [];
      let currentDate = new Date();
      const db = admin.firestore();
      await db
        .collection('bookings')
        .doc('6idYckzA4ZSAPld1hWsi')
        .get()
        .then(async (booking) => {
          for (const [gid, value] of Object.entries(booking.data())) {
            for (const [date, value1] of Object.entries(value)) {
              // console.log(date);
              let mySlots = [];
              let dateArray = date.split('-');
              let tempDate = new Date(
                parseInt(dateArray[2]),
                parseInt(dateArray[1]),
                parseInt(dateArray[0]),
              );
              //show current and future bookings
              if (tempDate >= currentDate) {
                for (const [uid, slots] of Object.entries(value1)) {
                  //    console.log('Slots: ', slots['bookedSlotID']);

                  slots['bookedSlotID'].forEach((slot) => {
                    mySlots.push(booking.data()[gid]['slots'][slot]);
                  });
                  if (userID === uid) {
                    for (let i = 0; i < slots['bookedSlotID'].length; i++) {}

                    const ground = await this.groundService.findGrounByID(gid);

                    myBookings.push({
                      name: ground[gid]['name'],
                      location: ground[gid]['city'],
                      slots: mySlots,
                      price: ground[gid]['bookingRate'],
                    });
                  }
                }
              }
            }
          }
        });
      return myBookings;
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
   * @returns all bookings of that ground - current bookings and future
   */
  async findAll(id: string): Promise<any> {
    try {
      const db = admin.firestore();
      let date = new Date();

      // check current and future bookings
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
            let dateArray = keys[i].split('-'); // splitting eg. 11-08-2022 // dd,mm,yy
            //yy-mm-dd  //converting to date object
            let tempDate = new Date(
              parseInt(dateArray[2]),
              parseInt(dateArray[1]),
              parseInt(dateArray[0]),
            );

            if (tempDate >= date) {
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
              console.log(userObj);
              users.push(userObj);
            }
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
      const availableSlots = [];
      const { date, groundID } = slotsDTO;

      await db
        .collection('bookings')
        .doc('6idYckzA4ZSAPld1hWsi')
        .get()
        .then((snapshot) => {
          for (const [key, value] of Object.entries(snapshot.data())) {
            //  console.log(key); //ground id

            if (key === groundID) {
              //first check if date selected is not created then show all slots//
              if (!Object.keys(value).includes(date)) {
                for (let [k, v] of Object.entries(value['slots'])) {
                  if (v === 'Full Day') {
                    v = { slotID: k };
                  }
                  Object.assign(v, { slotID: k });
                  availableSlots.push(v);
                }

                break;
              }
              for (const [key1, value1] of Object.entries(value)) {
                if (key1 !== 'slots' && key1 === date) {
                  for (const [key2, value2] of Object.entries(value[key1])) {
                    //  console.log(key2);

                    bookedSlots.push(...new Set(value2['bookedSlotID']));
                  }
                  // bookedSlots.push(...value2['bookedSlotID']);
                  // if slot1 and slot2 is there on this date, don't show fullDay slot
                  if (
                    bookedSlots.length ===
                      Object.keys(value['slots']).length - 1 ||
                    bookedSlots.includes('fullDay')
                  ) {
                    break;
                  } else {
                    // even if, one slot is booked, don't show fullDay
                    bookedSlots.forEach((slot) => {
                      Object.keys(value['slots']).forEach((slotID) => {
                        if (slot === slotID) {
                        } else {
                          if (slotID !== 'fullDay')
                            availableSlots.push({
                              ...value['slots'][slotID],
                              slotID: slotID,
                            });
                        }
                      });
                    });
                  }
                  break;
                }
              }
            }
          }
        });
      return availableSlots.flat();
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
