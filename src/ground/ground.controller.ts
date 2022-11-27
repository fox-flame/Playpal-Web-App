import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { GroundService } from './ground.service';
import { UpdateGroundDto } from './dto/update-ground.dto';
import { GroundDTO } from './dto/ground.dto';
import { VerifyDTO } from './dto/verifyGround.dto';

@Controller('ground')
export class GroundController {
  constructor(private readonly groundService: GroundService) {}

  //Selects sportsType,city then add name,location,price,userID,
  @Post()
  async create(@Body() createGroundDto: GroundDTO) {
    return await this.groundService.createGround(createGroundDto);
  }

  @Get()
  findAll() {
    return this.groundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groundService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGroundDto: UpdateGroundDto) {
  //   return this.groundService.update(+id, updateGroundDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groundService.remove(+id);
  }

  @Patch('verify')
  async markAsVerified(@Query() verifyDTO: VerifyDTO): Promise<any> {
    return await this.groundService.markAsVerified(verifyDTO);
  }
}
