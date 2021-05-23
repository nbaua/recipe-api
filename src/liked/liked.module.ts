import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from '../filter/schemas/recipe.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { LikedController } from './liked.controller';
import { LikedService } from './liked.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [LikedController],
  providers: [LikedService],
})
export class LikedModule {}
