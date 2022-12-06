import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('login')
  async Login(
    @Body() authDto: Omit<AuthDto, 'id'>,
  ): Promise<Omit<AuthDto, 'password'>> {
    return await this.authService.login(authDto);
  }

  @Post('signup')
  async Signup(@Body() authDto: Omit<AuthDto, 'id'>): Promise<void> {
    return await this.authService.Signup(authDto);
  }

  @Get()
  @UseGuards(new AuthGuard())
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Get('authenticate')
  public async authenticate(@Req() req: Request): Promise<any> {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new BadRequestException('Bad request');
    }
    try {
      const { uid, email } = await this.firebaseService.authenticate(authToken);
      return { uid, email, status: HttpStatus.OK };
    } catch (error) {
      throw new UnauthorizedException('unauthorized');
    }
  }
}
