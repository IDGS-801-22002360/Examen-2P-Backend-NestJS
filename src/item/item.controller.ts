// src/item/item.controller.ts
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import type { Product, Sale } from './interfaces/item.interface';

@Controller('api')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Get('items')
  findAll(@Query('q') query: string) {
    return this.itemService.findAll(query);
  }

  @Get('items/:id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.itemService.findOne(id);
  }

  @Post('addSale')
  addSale(@Body() createSaleDto: { productId: string; productName: string; price: number }) {
    return this.itemService.addSale(createSaleDto);
  }

  @Get('sales')
  async getSales(): Promise<Sale[]> {
    return this.itemService.getSales();
  }
}
