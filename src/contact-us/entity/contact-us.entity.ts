import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactUsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column({ type: 'text' })
  message: string;
}
