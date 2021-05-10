import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @UseGuards(JwtAuthGuard)
  @Get('recipe')
  public async getRecipesById(@Res() res, @Query('id') id) {
    console.log('Query', id);
    const recipe = await this.filterService.getRecipesById(id);
    if (!recipe) {
      throw new NotFoundException('Recipes does not exist!');
    }
    return res.status(HttpStatus.OK).json(recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recipes')
  public async getRecipes(
    @Res() res,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    const recipe = await this.filterService.getRecipes(page, limit);
    if (!recipe) {
      throw new NotFoundException('Recipes does not exist!');
    }
    return res.status(HttpStatus.OK).json(recipe);
  }

  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Get('category')
  public async getRecipesByCategory(
    @Res() res,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('category') category,
  ) {
    const recipe = await this.filterService.getRecipesByCategory(
      limit,
      category,
    );
    if (!recipe) {
      throw new NotFoundException('Recipes does not exist!');
    }
    return res.status(HttpStatus.OK).json(recipe);
  }

  @UseGuards(JwtAuthGuard)
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
