import { IsDateString, IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  CLIENT = 'CLIENT',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
}

@Entity({ name: 'user', schema: 'airline' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar' })
  name: string;

  @IsEmail()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  passwordHash: string;

  @IsDateString()
  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ type: 'text' })
  address: string;

  @Column({
    type: 'varchar',
    length: 20,
    enum: UserRole,
  })
  role: UserRole;
}
