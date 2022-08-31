import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import CategoryEntity from '@modules/database/entities/category.entity';
import ProductEntity from '@modules/database/entities/product.entity';
import { AbilityModule } from '@modules/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity]), AbilityModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
