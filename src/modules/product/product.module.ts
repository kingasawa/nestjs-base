import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import ProductEntity from '@modules/database/entities/product.entity';
import CategoryEntity from '@modules/database/entities/category.entity';
import { AbilityModule } from '@modules/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity]), AbilityModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
