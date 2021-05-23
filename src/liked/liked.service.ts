import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recipe } from '../filter/schemas/recipe.schema';
import { User } from '../user/schemas/user.schema';

export class LikedService {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<Recipe | any>,
    @InjectModel(User.name)
    private readonly userModel: Model<User | any>,
  ) {}

  public async getLikedRecipesByUserId(userId) {
    const recipes = await this.userModel
      .find(Types.ObjectId(userId))
      .populate({
        path: 'likedRecipes',
        match: {
          $and: [
            {
              published: true,
              pictureUrl: {
                $ne: '',
              },
            },
          ],
        },
        select: 'category description likes name pictureUrl views',
      })
      .exec();

    if (!recipes) {
      throw new NotFoundException(`Liked Recipes not found`);
    }

    return recipes;
  }

  public async findByIdAndUpdate(userId, recipeId) {
    const user = await this.userModel.findById(userId);

    if (user) {
      const recipes = user.likedRecipes;
      if (recipes.indexOf(recipeId) === -1) recipes.push(recipeId);

      await this.userModel.findByIdAndUpdate(
        userId,
        {
          likedRecipes: recipes,
        },
        { new: true },
      );
    }

    return this.getLikedRecipesByUserId(userId);
  }

  public async findByIdAndRemove(userId, recipeId) {
    const user = await this.userModel.findById(userId);

    if (user) {
      const recipes = user.likedRecipes.filter((r) => r != recipeId);
      await this.userModel.findByIdAndUpdate(
        userId,
        {
          likedRecipes: recipes,
        },
        { new: true },
      );
    }

    return this.getLikedRecipesByUserId(userId);
  }
}
