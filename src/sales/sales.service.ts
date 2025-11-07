// src/sales/sales.service.ts (Ajustado para TypeORM)

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sales.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  async createSale(saleData: Partial<Sale>): Promise<Sale> {
    const newSale = this.salesRepository.create({
      ...saleData,
      date: new Date(),
    });

    return this.salesRepository.save(newSale);
  }

  async findAllSales(): Promise<Sale[]> {
    return this.salesRepository.find();
  }
}
