import { IsString } from 'class-validator';

export class VerifyCoachDTO {
  @IsString()
  id!: string;
}
