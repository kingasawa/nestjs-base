import ProductEntity from '@modules/database/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared/base/base.service';
import { Repository } from 'typeorm';
// import { createUserData } from './product.type';
import { DELETE_MODE } from '@shared/common/constants';
// import { getManager } from 'typeorm';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) {
    super({
      repository: productRepository,
      deleteMode: DELETE_MODE.Hard,
    });
  }
}
