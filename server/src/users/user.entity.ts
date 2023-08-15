// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  profile_image_link: string;

  @CreateDateColumn({
    nullable: true,
  })
  email_verified_at: Timestamp;

  @Column({
    nullable: true,
  })
  contact_number: number;

  @CreateDateColumn({
    nullable: true,
  })
  created_at: Timestamp;

  @CreateDateColumn({
    nullable: true,
  })
  updated_at: Timestamp;
}
