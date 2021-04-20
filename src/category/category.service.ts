import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private categoryRepository: Repository<Category>;
  constructor(private _connection: Connection) {
    this.categoryRepository = this._connection.getRepository(Category);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create();

    newCategory.title = createCategoryDto.title;
    newCategory.description = createCategoryDto.description;

    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOne(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneOrFail(id);
    if (category) {
      await this.categoryRepository.update(id, updateCategoryDto);
    }
    return category;
  }

  async remove(id: string) {
    await this.categoryRepository.delete(id);
  }
}
