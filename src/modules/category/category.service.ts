import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared/base/base.service';
import { Repository } from 'typeorm';
import { DELETE_MODE } from '@shared/common/constants';
import CategoryEntity from '@modules/database/entities/category.entity';
import ProductEntity from '@modules/database/entities/product.entity';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
  ) {
    super({
      repository: [categoryRepository],
      deleteMode: DELETE_MODE.Hard,
    });
  }

  public async fetchAll(): Promise<any> {
    return await this.categoryRepository.find({
      relations: ['products'],
    });
  }

  // public async createWithRelation(payload: any = {}): Promise<any> {
  //   const products: ProductEntity[] = await this.productRepository.find();
  //   const CategoryEntity = <CategoryEntity>{
  //     title: 'test abc',
  //     description: 'test desc',
  //     products: products,
  //   };
  //   const result = await this.categoryRepository.insert(CategoryEntity);
  //   await this.categoryRepository.save(CategoryEntity);
  //   return result;
  // }

  public async create(payload): Promise<any> {
    console.log('payload', payload);
    const products: ProductEntity[] = await this.productRepository.find();
    const CategoryEntity = <CategoryEntity>{
      title: 'test abc',
      description: 'test desc',
      products: products,
    };
    const result = await this.categoryRepository.insert(CategoryEntity);
    await this.categoryRepository.save(CategoryEntity);
    return result;
  }
}
