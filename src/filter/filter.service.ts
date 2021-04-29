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

  public async getRecipesByTag(
    tag: string,
    page = 1,
    limit = 10,
  ): Promise<Recipe> {
    const skip: number = (page - 1) * limit;

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
                $text: {
                  $search: tag,
                },
              },
            ],
          },
        },
        { $sort: { name: 1 } },
        {
          $project: {
            // category: 1,
            // description: 1,
            // likes: 1,
            name: 1,
            // pictureUrl: 1,
            // views: 1,
          },
        },
        {
          $facet: {
            total: [
              {
                $count: 'createdAt',
              },
            ],
            data: [
              {
                $addFields: {
                  _id: '$_id',
                },
              },
            ],
          },
        },
        {
          $unwind: '$total',
        },
        {
          $project: {
            data: {
              $slice: [
                '$data',
                skip,
                {
                  $ifNull: [limit, '$total.createdAt'],
                },
              ],
            },
            meta: {
              total: '$total.createdAt',
              limit: {
                $literal: limit,
              },
              page: {
                $literal: skip / limit + 1,
              },
              pages: {
                $ceil: {
                  $divide: ['$total.createdAt', limit],
                },
              },
            },
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
