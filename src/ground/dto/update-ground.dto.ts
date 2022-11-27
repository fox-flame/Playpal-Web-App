import { PartialType } from '@nestjs/mapped-types';
import { GroundDTO } from './ground.dto';

export class UpdateGroundDto extends PartialType(GroundDTO) {}
