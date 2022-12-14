import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookGroundDTO } from './dto/book-ground-dto';
import { CreateBookingDto } from './dto/create-booking.dto';
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
   * @param gid
   * @returns Bookings
   */
  @Get(':id')
  async getBookings(@Param('id') gid: string): Promise<any> {
    return await this.bookingService.findAll(gid);
  }

  @Get(':id')
  async isSlot(@Param('id') id: string): Promise<Boolean> {
    return await this.bookingService.findOne(id);
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
