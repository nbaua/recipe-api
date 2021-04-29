import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('random')
  public async getRandomRecipes(
    @Res() res,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    const recipe = await this.filterService.getRandomRecipes(limit);
    if (!recipe) {
      throw new NotFoundException('Recipes does not exist!');
    }
    return res.status(HttpStatus.OK).json(recipe);
  }

  @Get('search')
  public async getRecipesByTag(
    @Res() res,
    @Query('tag') tag,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    const recipe = await this.filterService.getRecipesByTag(tag, page, limit);
    if (!recipe) {
      throw new NotFoundException('Recipes does not exist!');
    }
    return res.status(HttpStatus.OK).json(recipe);
  }
}
