import { Injectable } from '@nestjs/common';
import { Connection, MongoRepository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  private recipeRepository: MongoRepository<Recipe>;
  constructor(private _connection: Connection) {
    this.recipeRepository = this._connection.getMongoRepository(Recipe);
  }

  //not implemented completely yet
  async create(createRecipeDto: CreateRecipeDto) {
    const newRecipe = this.recipeRepository.create();

    newRecipe.category = createRecipeDto.category;
    newRecipe.ingredients = createRecipeDto.ingredients;
    newRecipe.times = createRecipeDto.times;
    newRecipe.name = createRecipeDto.name;
    newRecipe.pictureUrl = createRecipeDto.pictureUrl;
    newRecipe.servings = createRecipeDto.servings;
    // newRecipe.source = createRecipeDto.source;
    newRecipe.sourceUrl = createRecipeDto.sourceUrl;

    await this.recipeRepository.save(newRecipe);
    return newRecipe;
  }

  //deprecated in favor of filter match and aggregation
  async findAll(page: number, limit: number) {
    const [result, total] = await this.recipeRepository.findAndCount({
      where: {
        $and: [
          {
            published: true,
          },
          {
            pictureUrl: {
              $ne: '',
            },
          },
        ],
      },
      //where: { $and: [{ published: true }, { servings: '5' }] },
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: string) {
    return await this.recipeRepository.findOne({where : {id: id}});
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findOneOrFail({where : {id: id}});
    if (recipe) {
      await this.recipeRepository.update(id, updateRecipeDto);
    }
    return recipe;
  }

  async remove(id: string) {
    await this.recipeRepository.delete(id);
  }
}
