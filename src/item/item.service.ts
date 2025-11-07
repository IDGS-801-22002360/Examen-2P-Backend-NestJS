import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/item.interface';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ItemService {
  private readonly productsPath = path.join(
    process.cwd(),
    'src',
    'products.json',
  );
  private productsCache: Product[] | null = null;

  async findAll(query?: string): Promise<Product[]> {
    const products = await this.loadProducts();
    
    if (!query) {
      return products;
    }

    query = query.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  async findOne(id: string): Promise<Product> {
    const products = await this.loadProducts();
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  private async loadProducts(): Promise<Product[]> {
    if (this.productsCache) {
      return this.productsCache;
    }

    try {
      const data = await fs.readFile(this.productsPath, 'utf8');
      const products = JSON.parse(data) as Product[];
      this.productsCache = products;
      return products;
    } catch (error) {
      console.error('Error loading products:', error);
      throw new Error('Could not load products');
    }
  }
}
