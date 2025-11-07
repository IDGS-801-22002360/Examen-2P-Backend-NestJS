import { Controller, Get, Param, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import type { Product } from './interfaces/item.interface';

@Controller('api')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('items')
  findAll(@Query('q') query?: string) {
    return this.itemService.findAll(query);
  }

  @Get('items/:id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.itemService.findOne(id);
  }
}
