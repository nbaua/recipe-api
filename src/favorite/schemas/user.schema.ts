import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Recipe } from '../../filter/schemas/recipe.schema';

@Schema({ collection: 'user', id: true, timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: String, ref: Recipe.name }] })
  favoriteRecipes: Recipe[];
}
export const UserSchema = SchemaFactory.createForClass(User);
