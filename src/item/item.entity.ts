import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  discountPercentage: number;

  @Column('decimal', { precision: 3, scale: 2 })
  rating: number;

  @Column()
  stock: number;

  @Column('simple-array')
  tags: string[];

  @Column({ nullable: true })
  brand: string;

  @Column()
  sku: string;

  @Column()
  weight: number;

  @Column('simple-json')
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  @Column({ nullable: true })
  warrantyInformation: string;

  @Column()
  shippingInformation: string;

  @Column()
  availabilityStatus: string;

  @Column('simple-array')
  images: string[];

  @Column()
  thumbnail: string;

  @Column('simple-json')
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}
