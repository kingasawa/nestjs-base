import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import BaseEntity from './base';
import UserEntity from './user.entity';

@Entity({ name: 'clubs' })
class ClubEntity extends BaseEntity {
  @Column({ type: 'varchar', width: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', width: 12, nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @ManyToMany(() => UserEntity, (user) => user.clubs)
  @JoinTable({
    name: 'user_club',
    joinColumns: [{ name: 'clubsId' }],
  })
  users: UserEntity[];
}

export default ClubEntity;
