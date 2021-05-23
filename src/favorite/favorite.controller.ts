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
    return res.status(HttpStatus.OK).json(recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Put('add')
  public async findByIdAndUpdate(@Body() { userId, recipeId }) {
    const result = await this.filterService.findByIdAndUpdate(userId, recipeId);
    return result
      ? await this.filterService.getFavoriteRecipesByUserId(userId)
      : null;
  }

  @UseGuards(JwtAuthGuard)
  @Put('remove')
  public async findByIdAndRemove(@Body() { userId, recipeId }) {
    const result = await this.filterService.findByIdAndRemove(userId, recipeId);
    return result
      ? await this.filterService.getFavoriteRecipesByUserId(userId)
      : null;
  }
}
