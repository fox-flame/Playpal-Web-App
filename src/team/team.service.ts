import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import * as admin from 'firebase-admin';
import { uuidv4 } from '@firebase/util';

@Injectable()
export class TeamService {
  async create(createTeamDto: CreateTeamDto) {
    try {
      const db = admin.firestore();
      const {
        teamName,
        teamLocation,
        teamSports,
        underAge,
        playerID,
        description,
      } = createTeamDto;
      const teamID = uuidv4();
      await db
        .collection('teams')
        .doc('F9y3tEXZ7LeOQZAMzoU2')
        .set(
          {
            [teamID]: {
              description: description,
              location: teamLocation,
              name: teamName,
              sportWePlay: teamSports,
              underAge: underAge,
              members: {
                playerID: 'admin',
              },
            },
          },
          { merge: true },
        )
        .then(async () => {
          await db
            .collection('users')
            .doc('player')
            .update({
              [`${playerID}.myTeams.${teamID}`]: teamName,
            });
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  /**
   *
   * @returns teams list
   */
  async findAll(): Promise<any> {
    try {
      const teamsList = [];
      const db = admin.firestore();
      await db
        .collection('teams')
        .doc('F9y3tEXZ7LeOQZAMzoU2')
        .get()
        .then(async (teamList) => {
          teamsList.push(teamList.data());
        });
      return teamsList;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
