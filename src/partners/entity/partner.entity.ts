import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PartnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  companyName: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  comment: string;
}
