import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly filterService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  public async getFavoriteRecipesByUserId(@Res() res, @Query('id') id) {
    const recipe = await this.filterService.getFavoriteRecipesByUserId(id);
    if (!recipe) {
      throw new NotFoundException('Favorite Recipes does not exist!');
    }
    return res.status(HttpStatus.OK).json(recipe[0].favoriteRecipes);
  }

  @UseGuards(JwtAuthGuard)
  @Put('add')
  public async findByIdAndUpdate(@Res() res, @Body() { userId, recipeId }) {
    const recipe = await this.filterService.findByIdAndUpdate(userId, recipeId);
    return res.status(HttpStatus.OK).json(recipe[0].favoriteRecipes);
  }

  @UseGuards(JwtAuthGuard)
  @Put('remove')
  public async findByIdAndRemove(@Res() res, @Body() { userId, recipeId }) {
    const recipe = await this.filterService.findByIdAndRemove(userId, recipeId);
    return res.status(HttpStatus.OK).json(recipe[0].favoriteRecipes);
  }
}
