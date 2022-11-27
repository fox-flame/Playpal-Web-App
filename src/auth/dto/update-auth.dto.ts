import { PartialType } from '@nestjs/mapped-types';
import { AuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(AuthDto) {}
