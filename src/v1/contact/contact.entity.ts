import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contact', schema: 'public' })
@Index(['seq', 'email'])
export class Contact {
  @PrimaryGeneratedColumn()
  seq: number;

  @IsNotEmpty({ message: 'name column required' })
  @IsString({ message: 'name column must be string' })
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @IsNotEmpty({ message: 'email column required' })
  @IsEmail({ message: 'email column must be email type' })
  @Column({ name: 'email', type: 'varchar', nullable: false })
  email: string;

  @IsNotEmpty({ message: 'subject column required' })
  @IsString({ message: 'subject column must be string' })
  @Column({ name: 'subject', type: 'varchar', nullable: false })
  subject: string

  @IsNotEmpty({ message: 'content column required' })
  @IsString({ message: 'content column must be string' })
  @Column({ name: 'content', type: 'varchar', nullable: false })
  content: string;
}
