import UserEntity from '@modules/database/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared/base/base.service';
import { Repository } from 'typeorm';
import { createUserData } from './category.type';
import { DELETE_MODE } from '@shared/common/constants';
import { getManager } from 'typeorm';
import CategoryEntity from '@modules/database/entities/category.entity';
import ProductEntity from '@modules/database/entities/product.entity';
// import ProductEntity from "@modules/database/entities/product.entity";

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

  public async fetchAll(payload = {}): Promise<any> {
    const categories: CategoryEntity[] = await this.categoryRepository.find({
      relations: ['products'],
    });
    return categories;
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

  public async create(payload: any = {}): Promise<any> {
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
