// src/item/item.service.ts

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import * as productsData from '../products.json';
import type { Product, Sale } from './interfaces/item.interface';

@Injectable()
export class ItemService {
  private readonly products: Product[] = (productsData as any).default as Product[];
  private readonly salesCollection = 'sales';

  constructor(@Inject('FIRESTORE_DB') private readonly firestore: Firestore) { }

  findAll(query: string) {
    if (!query) {
      return this.products.slice(0, 10).map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        snippet: p.description.substring(0, 100) + '...',
      }));
    }
    const q = query.toLowerCase();
    const results = this.products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );

    return results.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      category: p.category,
      snippet: p.description.substring(0, 100) + '...',
    }));
  }

  async findOne(id: string): Promise<Product> {
    const productId = parseInt(id, 10);
    const product = this.products.find((p) => p.id === productId);

    if (!product) {
      throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    }
    return product;
  }

  async addSale(createSaleDto: {
    productId: string;
    productName: string;
    price: number;
  }) {
    const newSale = {
      ...createSaleDto,
      date: new Date().toISOString(),
    };

    await this.firestore.collection(this.salesCollection).add(newSale);

    return { success: true, message: 'Compra registrada' };
  }

  async getSales(): Promise<Sale[]> {
    const snapshot = await this.firestore.collection(this.salesCollection).get();

    const sales = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Sale[];

    return sales;
  }
}
