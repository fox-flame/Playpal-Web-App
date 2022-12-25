import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  paymentType: string = 'Jazzcash';

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;
}
