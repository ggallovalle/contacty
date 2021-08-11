import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  Body,
  UseFilters,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthAware } from '../../types/auth';
import { AppExceptionFilter } from '../../errors';

@UseFilters(AppExceptionFilter)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly _contactService: ContactsService) {}

  @Post()
  async create(@Body() data, @CurrentUser() user: AuthAware) {
    return this._contactService.create(data, user);
  }

  @Get()
  async findAll(@CurrentUser() user: AuthAware) {
    return this._contactService.findAll(user);
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthAware
  ) {
    return this._contactService.findById(id, user);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthAware
  ) {
    return this._contactService.deleteById(id, user);
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data,
    @CurrentUser() user: AuthAware
  ) {
    return this._contactService.updateById(id, data, user);
  }
}
