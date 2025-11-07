import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  productId: string;

  @Column({ type: 'text' })
  productName: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'timestamp with time zone' })
  date: Date;
}
