import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import BaseEntity from './base';
import ClubEntity from '@modules/database/entities/club.entity';
import EventEntity from '@modules/database/entities/event.entity';

@Entity({ name: 'users' })
class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', width: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', width: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', width: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', width: 12, nullable: false })
  phone: string;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  authority: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  active: number;

  @Column({ type: 'varchar', width: 100, nullable: true })
  registerToken: string;

  @ManyToMany(() => ClubEntity)
  @JoinTable({
    name: 'user_club',
    joinColumns: [{ name: 'usersId' }],
    inverseJoinColumns: [{ name: 'clubsId' }],
  })
  clubs: ClubEntity[];

  @ManyToMany(() => EventEntity)
  @JoinTable({
    name: 'user_event',
    joinColumns: [{ name: 'usersId' }],
    inverseJoinColumns: [{ name: 'eventsId' }],
  })
  events: EventEntity[];

  @BeforeInsert()
  async hasPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    this.password && (this.password = await bcrypt.hash(this.password, 10));
  }
}

export default UserEntity;
