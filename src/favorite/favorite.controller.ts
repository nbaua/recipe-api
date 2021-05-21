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
  public async getRecipesById(@Res() res, @Query('id') id) {
    const recipe = await this.filterService.getFavoriteRecipes(id);
    if (!recipe) {
      throw new NotFoundException('Favorite Recipes does not exist!');
    }
    return res.status(HttpStatus.OK).json(recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Put('add')
  findByIdAndUpdate(@Body() { userId, recipeId }) {
    return this.filterService.findByIdAndUpdate(userId, recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('remove')
  findByIdAndRemove(@Body() { userId, recipeId }) {
    return this.filterService.findByIdAndRemove(userId, recipeId);
  }
}
