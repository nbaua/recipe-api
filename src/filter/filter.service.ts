import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from './schemas/recipe.schema';

@Injectable()
export class FilterService {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<Recipe | any>,
  ) {}

  // public async findAll(paginationQuery: PaginationQueryDto): Promise<Recipe[]> {
  //   const { limit, offset } = paginationQuery;

  //   return await this.recipeModel
  //     .find()
  //     .skip(+offset)
  //     .limit(+limit)
  //     .exec();
  // }

  public async getRandomRecipes(limit: number): Promise<Recipe> {
    console.log(limit, 'yoyo');
    const recipe = await this.recipeModel
      .aggregate([
        {
          $match: {
            $and: [
              {
                published: true,
                pictureUrl: {
                  $ne: '',
                },
              },
            ],
          },
        },
        {
          $sample: {
            size: +limit,
          },
        },
        {
          $project: {
            category: 1,
            description: 1,
            likes: 1,
            name: 1,
            pictureUrl: 1,
            views: 1,
          },
        },
      ])
      .exec();

    if (!recipe) {
      throw new NotFoundException(`Recipes  not found`);
    }

    return recipe;
  }
}
