import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { FavoriteModule } from './favorite/favorite.module';
import { FilterModule } from './filter/filter.module';
import { LikedModule } from './liked/liked.module';
import { Recipe } from './recipe/entities/recipe.entity';
import { RecipeModule } from './recipe/recipe.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      appname: 'recipe-app',
      type: 'mongodb',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true,
      url: process.env.DB_CONN,
      entities: [Category, Recipe, User, Admin],
    }),
    MongooseModule.forRoot(process.env.DB_CONN, {
      // useFindAndModify: false, - do NOT use this - deperecated
      // useCreateIndex: false, - do NOT use this - deperecated
      useNewUrlParser: true,
    }),
    RecipeModule,
    CategoryModule,
    AuthModule,
    UserModule,
    FilterModule,
    FavoriteModule,
    LikedModule,
    AdminModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
