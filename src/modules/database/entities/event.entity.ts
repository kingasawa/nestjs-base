import { Column, Entity } from 'typeorm';
import BaseEntity from './base';

@Entity({ name: 'clubs' })
class EventEntity extends BaseEntity {
  @Column({ type: 'varchar', width: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', width: 12, nullable: false })
  description: string;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  location: string;
}

export default EventEntity;
