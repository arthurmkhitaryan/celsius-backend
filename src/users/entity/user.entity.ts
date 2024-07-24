import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  city: string;

  @Column()
  postcode: string;

  @Column()
  streetAddress: string;

  @Column()
  houseFlatNumber: string;

  @Column({ default: 'customer' })
  role: string;
}
