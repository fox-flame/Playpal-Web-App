import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookGroundDTO } from './dto/book-ground-dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { MyBookingsDTO } from './dto/myBookings-dto';
import { SlotDTO } from './dto/slot-dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<any> {
    return await this.bookingService.create(createBookingDto);
  }

  @Post('book')
  async bookAGround(@Body() bookGroundDto: BookGroundDTO): Promise<any> {
    return await this.bookingService.bookAGround(bookGroundDto);
  }
  /**
   *
   * @param gid ground id
   * @returns Returns all bookings associated with that ground
   */
  @Get('ground/:id')
  async getBookings(@Param('id') gid: string): Promise<any> {
    return await this.bookingService.findAll(gid);
  }

  @Get('slot/:id')
  async isSlot(@Param('id') id: string): Promise<Boolean> {
    return await this.bookingService.findOne(id);
  }

  @Get('slots')
  async findAvailableSlots(@Query() slotsDTO: SlotDTO): Promise<any> {
    return await this.bookingService.findAvailableSlots(slotsDTO);
  }

  @Get('my-bookings')
  async getMyBookings(@Query() myBookingsDTO: MyBookingsDTO): Promise<any> {
    return await this.bookingService.getMyBookings(myBookingsDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
