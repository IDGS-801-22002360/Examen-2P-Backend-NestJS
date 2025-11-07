import { Controller, Post, Body } from '@nestjs/common';
import { AddSaleDto } from './add-sale.dto';
import { SalesService } from './sales.service';

@Controller('api')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('addSale')
  async addSale(@Body() saleData: AddSaleDto): Promise<any> {
    await this.salesService.createSale({
      productId: saleData.productId,
      productName: saleData.productName,
      price: saleData.price,
      date: new Date(),
    });

    return { success: true, message: 'Venta registrada' };
  }
}
