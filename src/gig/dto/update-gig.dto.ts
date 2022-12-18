import { PartialType } from '@nestjs/mapped-types';
import { CreateGigDto } from './create-gig.dto';

export class UpdateGigDto extends PartialType(CreateGigDto) {}
