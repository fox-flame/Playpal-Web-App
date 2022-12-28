import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import * as admin from 'firebase-admin';
import { uuidv4 } from '@firebase/util';
import { AddPlayerDTO } from './dto/add-player-dto';

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

  async addPlayer(addPlayerDto: AddPlayerDTO) {
    try {
      const db = admin.firestore();
      const { phoneNumber, teamID } = addPlayerDto;

      await db
        .collection('users')
        .doc('player')
        .get()
        .then(async (player) => {
          for (const [pid, data] of Object.entries(player.data())) {
            if (data['phoneNumber'] === phoneNumber) {
              await db
                .collection('teams')
                .doc('F9y3tEXZ7LeOQZAMzoU2')
                .update({
                  [`${teamID}.members`]: {
                    [pid]: 'normal',
                  },
                });
            }
          }
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getMembersofTeam(id: string): Promise<any> {
    try {
      const db = admin.firestore();
      let teamMembers = [];

      await db
        .collection('users')
        .doc('player')
        .get()
        .then(async (player) => {
          await db
            .collection('teams')
            .doc('F9y3tEXZ7LeOQZAMzoU2')
            .get()
            .then((teams) => {
              for (const [key, value] of Object.entries(teams.data())) {
                if (key === id) {
                  for (const [key2, value2] of Object.entries(
                    value['members'],
                  )) {
                    console.log(player.data()[key2]);
                    teamMembers.push({
                      id: key2,
                      role: value2,
                      displayName: player.data()[key2]['displayName'],
                      phoneNumber: player.data()[key2]['phoneNumber'],
                    });
                  }
                  break;
                }
              }
            });
        });
      return teamMembers;
    } catch (error) {}
  }

  findOne(id: string) {
    try {
      return `This action returns a #${id} team`;
    } catch (error) {}
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
