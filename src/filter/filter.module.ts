import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [FilterController],
  providers: [FilterService],
})
export class FilterModule {}
