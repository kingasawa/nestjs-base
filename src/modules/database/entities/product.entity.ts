import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import BaseEntity from './base';
import CategoryEntity from './category.entity';

@Entity({ name: 'products' })
class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', width: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', width: 100, nullable: true })
  description: string;

  @Column({ type: 'varchar', width: 100, nullable: true })
  price: string;

  @Column({ type: 'varchar', width: 12, nullable: true })
  attributes: string;

  @ManyToMany(() => CategoryEntity, (category) => category.products, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  categories: CategoryEntity[];
}

export default ProductEntity;
