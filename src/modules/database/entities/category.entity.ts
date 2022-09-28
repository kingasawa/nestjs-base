import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import BaseEntity from './base';
import ProductEntity from './product.entity';

@Entity({ name: 'categories' })
class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', width: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', width: 12, nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  banner: string;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  active: number;

  @ManyToMany(() => ProductEntity, (product) => product.categories, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  products: ProductEntity[];
}

export default CategoryEntity;
