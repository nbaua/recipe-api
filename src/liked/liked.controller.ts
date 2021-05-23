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
import { LikedService } from './liked.service';

@Controller('liked')
export class LikedController {
  constructor(private readonly filterService: LikedService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  public async getLikedRecipesByUserId(@Res() res, @Query('id') id) {
    const recipe = await this.filterService.getLikedRecipesByUserId(id);
    if (!recipe) {
      throw new NotFoundException('Liked Recipes does not exist!');
    }
    return res.status(HttpStatus.OK).json(recipe[0].likedRecipes);
  }

  @UseGuards(JwtAuthGuard)
  @Put('add')
  public async findByIdAndUpdate(@Res() res, @Body() { userId, recipeId }) {
    const recipe = await this.filterService.findByIdAndUpdate(userId, recipeId);
    return res.status(HttpStatus.OK).json(recipe[0].likedRecipes);
  }

  @UseGuards(JwtAuthGuard)
  @Put('remove')
  public async findByIdAndRemove(@Res() res, @Body() { userId, recipeId }) {
    const recipe = await this.filterService.findByIdAndRemove(userId, recipeId);
    return res.status(HttpStatus.OK).json(recipe[0].likedRecipes);
  }
}
