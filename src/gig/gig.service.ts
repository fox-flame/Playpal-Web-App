import { Injectable } from '@nestjs/common';
import { CreateGigDto } from './dto/create-gig.dto';
import { UpdateGigDto } from './dto/update-gig.dto';
import * as admin from 'firebase-admin';
import { uuidv4 } from '@firebase/util';

@Injectable()
export class GigService {
  async create(createGigDto: CreateGigDto) {
    try {
      const db = admin.firestore();
      const { userID } = createGigDto;
      let gigID = uuidv4();
      await db
        .collection('gigs')
        .doc('mcfbUgSQkXX6mmtMiXKl')
        .set(
          {
            [gigID]: { ...createGigDto },
          },
          { merge: true },
        );
      // gig created, now set its reference in coach, who created gig
      await db
        .collection('users')
        .doc('coaches')
        .update({
          [`${userID}.gigID`]: gigID,
        });
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @returns all gigs of coaches.
   */
  async findAll(): Promise<any> {
    try {
      // mcfbUgSQkXX6mmtMiXKl gigs
      var gigs = [];
      const db = admin.firestore();
      await db
        .collection('users')
        .doc('coaches')
        .get()
        .then(async (snapshot) => {
          for (const [key, coach] of Object.entries(snapshot.data())) {
            //check if coach created gig

            if (Object.keys(coach).includes('gigID')) {
              await db
                .collection('gigs')
                .doc('mcfbUgSQkXX6mmtMiXKl')
                .get()
                .then((g) => {
                  if (Object.keys(g.data()).includes(coach['gigID'])) {
                    Object.assign(coach, {
                      gig: {
                        ...g.data()[coach['gigID']],
                      },
                    });
                    gigs.push({ ...coach });
                  }
                });
            }
          }
        });
      return gigs;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} gig`;
  }

  update(id: number, updateGigDto: UpdateGigDto) {
    return `This action updates a #${id} gig`;
  }

  async remove(id: string) {
    try {
      const db = admin.firestore();
      await db
        .collection('gigs')
        .doc('mcfbUgSQkXX6mmtMiXKl')
        .update({
          [id]: admin.firestore.FieldValue.delete(),
        });
    } catch (error) {
      console.log(error);
    }
  }
}