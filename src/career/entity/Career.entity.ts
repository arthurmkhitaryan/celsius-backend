// src/product/contact-us.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  postingDate: Date;

  @Column()
  address: string;

  @Column()
  content: string;
}
