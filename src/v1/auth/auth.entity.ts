import { Entity, Index, PrimaryColumn, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user', schema: 'public' })
@Index(['seq', 'uuid', 'username', 'email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  seq: number;

  @Column({ name: 'uuid', type: 'varchar' })
  @Generated('uuid')
  uuid: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ name: 'username', type: 'varchar', length: 32, nullable: false, unique: true })
  username: string
  
  @Column({ name: 'password', type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ name: 'role', type: 'varchar', nullable: false, default: 'normal' })
  role: string;

  @CreateDateColumn({ name: 'regdate', type: 'timestamp with time zone' })
  regdate: Date;

  @OneToMany(type => AccessLog, log => log.user)
  log: AccessLog[];
}

/* for session storage */
@Entity({ name: 'session', schema: 'public' })
@Index(['sid'], { unique: true })
export class Session {
  @PrimaryColumn({ name: 'sid', type: 'varchar' })
  sid: string;

  @Column({ name: 'sess', type: 'varchar', nullable: false })
  sess: string;

  @Column({ name: 'expire', type: 'timestamp with time zone', nullable: false })
  expire: Date;
}

/* access log */
@Entity({ name: 'accesslog', schema: 'public' })
@Index(['user', 'ip'], { unique: false })
export class AccessLog {
  @PrimaryGeneratedColumn()
  seq: number;

  @Column({ name: 'ip', type: 'varchar', nullable: false })
  ip: string;

  @CreateDateColumn({ name: 'accessdate', type: 'timestamp with time zone', nullable: false })
  accessdate: Date;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'seq' })
  user: User;
}