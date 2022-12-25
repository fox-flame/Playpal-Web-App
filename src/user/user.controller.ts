import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user-dto';
import { VerifyCoachDTO } from './dto/verify-coach-DTO';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // get unverified coaches
  @Get('coaches')
  async getUnverifiedCoaches(): Promise<any> {
    return await this.userService.getCoaches();
  }

  @Get('/all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('coach-check/:id')
  async isVerified(@Param('id') id: string): Promise<any> {
    return await this.userService.isCoachVerified(id);
  }

  @Patch('verify-coach')
  async markCoachVerified(@Query() verifyDTO: VerifyCoachDTO): Promise<any> {
    return await this.userService.markAsVerified(verifyDTO);
  }

  @Get()
  async getUser(@Body() user: GetUserDto): Promise<any> {
    return await this.userService.getUserByRoleAndId(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.userService.findUserByID(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
