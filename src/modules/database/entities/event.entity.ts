import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import BaseEntity from './base';
import ClubEntity from '@modules/database/entities/club.entity';
import UserEntity from '@modules/database/entities/user.entity';

@Entity({ name: 'events' })
class EventEntity extends BaseEntity {
  @Column({ type: 'varchar', width: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', width: 12, nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'datetime', nullable: true })
  startDate: string;

  @Column({ type: 'datetime', nullable: true })
  endDate: string;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  active: number;

  @ManyToMany(() => UserEntity, (user) => user.events)
  @JoinTable({
    name: 'user_event',
    joinColumns: [{ name: 'evensId' }],
  })
  users: UserEntity[];

  @ManyToOne(() => ClubEntity, (club) => club.events)
  club: ClubEntity;
}

export default EventEntity;
