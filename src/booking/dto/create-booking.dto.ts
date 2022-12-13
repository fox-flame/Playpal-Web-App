import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    groundID!: string;

    @IsString()
    @IsNotEmpty()
    start1!: string;

    @IsString()
    @IsNotEmpty()
    close1!: string;
    
    @IsString()
    @IsNotEmpty()
    start2!: string;
    
    @IsString()
    @IsNotEmpty()
    close2!: string;
}
