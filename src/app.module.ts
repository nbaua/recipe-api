import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { FavoriteModule } from './favorite/favorite.module';
import { FilterModule } from './filter/filter.module';
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
      url: process.env.DB_CONN,
      // ssl: true /** DO NOT TURN THIS ON UNLESS ON SSL PRODUCTION SERVER**/,
      // type: process.env.DB_TYPE as any,
      // host: process.env.DB_HOST,
      // port: process.env.DB_PORT as any,
      // database: process.env.DB_NAME,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      entities: [Category, Recipe, User],
      //entities: ['../**/*.entity.{ts,js}'],
      synchronize: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONN, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    RecipeModule,
    CategoryModule,
    AuthModule,
    UserModule,
    FilterModule,
    FavoriteModule,
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
export class AppModule {}
