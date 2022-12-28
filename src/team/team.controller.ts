import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddPlayerDTO } from './dto/add-player-dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamService.create(createTeamDto);
  }

  @Get('/list')
  async findAll(): Promise<any> {
    return await this.teamService.findAll();
  }


  @Post('/add-player')
  async addPlayer(@Body() addPlayerDto:AddPlayerDTO) {
    return await this.teamService.addPlayer(addPlayerDto);    
  }

  @Get('/members/:id') 
  async getMembersofTeam(@Param('id') id:string):Promise<any>{
    return await this.teamService.getMembersofTeam(id);
  }

  
  @Get(':id')
  findMyTeam(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
