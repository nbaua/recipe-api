import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/google.strategy';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      appname: 'recipe-app',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      // username: 'root',
      // password: 'SqlAdmin$123',
      database: 'recipe-db',
      entities: [Category, Recipe],
      //entities: ['../**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 10,
    }),
    RecipeModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    GoogleStrategy,
  ],
})
export class AppModule {}
