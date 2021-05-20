import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
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
  @Get('recipe')
  public async getRecipesById(@Res() res, @Query('id') id) {
    // console.log('Query', id);
    const recipe = await this.filterService.getFavoriteRecipes(id);
    if (!recipe) {
      throw new NotFoundException('Favorite Recipes does not exist!');
    }
    return res.status(HttpStatus.OK).json(recipe);
  }
}
