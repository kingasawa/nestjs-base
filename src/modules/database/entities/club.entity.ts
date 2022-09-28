import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import BaseEntity from './base';
import UserEntity from './user.entity';
import EventEntity from '@modules/database/entities/event.entity';

@Entity({ name: 'clubs' })
class ClubEntity extends BaseEntity {
  @Column({ type: 'varchar', width: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', width: 12, nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @ManyToMany(() => UserEntity, (user) => user.clubs)
  @JoinTable({
    name: 'user_club',
    joinColumns: [{ name: 'clubsId' }],
  })
  users: UserEntity[];

  @OneToMany(() => EventEntity, (event) => event.club)
  events: EventEntity[];
}

export default ClubEntity;
