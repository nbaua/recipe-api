import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recipe } from '../filter/schemas/recipe.schema';
import { User } from './schemas/user.schema';

export class FavoriteService {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<Recipe | any>,
    @InjectModel(User.name)
    private readonly userModel: Model<User | any>,
  ) {}

  public async getFavoriteRecipes(userId, page = 1, limit = 10) {
    const recipes = await this.userModel
      .find(Types.ObjectId(userId))
      .populate('favoriteRecipes');

    if (!recipes) {
      throw new NotFoundException(`Favorite Recipes not found`);
    }

    return recipes;
  }
}
