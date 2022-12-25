import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GigService } from './gig.service';
import { CreateGigDto } from './dto/create-gig.dto';
import { UpdateGigDto } from './dto/update-gig.dto';

@Controller('gig')
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @Post()
  create(@Body() createGigDto: CreateGigDto) {
    return this.gigService.create(createGigDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return await this.gigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gigService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGigDto: UpdateGigDto) {
    return this.gigService.update(+id, updateGigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gigService.remove(id);
  }
}
